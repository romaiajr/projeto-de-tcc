import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from '../interfaces/dto/users/user.request';
import { PasswordsService } from './password.service';
import {
  GetUserResponseDTO,
  UserResponseDTO,
} from '../interfaces/dto/users/user.response';
import { UserPreference } from 'src/entities/user-preferences.entity';
import { VisionImpairment } from 'src/enums/vision-impairment';
import {
  UpdateUserPreferencesRequestDTO,
  UserPreferencesDTO,
} from 'src/interfaces/dto/user-preferences/preferences.request';
import { FontSizeRange, InterfaceContrast } from 'src/enums/user-preferences';
import { UserPreferencesResponseDTO } from 'src/interfaces/dto/user-preferences/preferences.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserPreference)
    private preferencesRepository: Repository<UserPreference>,
    private readonly passwordService: PasswordsService,
  ) {}

  configUserPreferences(severity: VisionImpairment): UserPreferencesDTO {
    const defaultPreferences: UserPreferencesDTO = {
      audio_description: false,
      font_size: FontSizeRange.DEFAULT,
      interface_contrast: InterfaceContrast.DEFAULT,
    };

    const preferencesMap: Record<
      VisionImpairment,
      Partial<UserPreferencesDTO>
    > = {
      [VisionImpairment.NONE]: {},
      [VisionImpairment.MILD]: { font_size: FontSizeRange.MILD },
      [VisionImpairment.MODERATE]: { font_size: FontSizeRange.MODERATE },
      [VisionImpairment.NEAR]: { font_size: FontSizeRange.NEAR },
      [VisionImpairment.SEVERE]: {
        audio_description: true,
        font_size: FontSizeRange.SEVERE,
        interface_contrast: InterfaceContrast.HIGH_CONTRAST_BLACK_WHITE,
      },
      [VisionImpairment.BLINDNESS]: { audio_description: true },
    };

    return { ...defaultPreferences, ...preferencesMap[severity] };
  }

  async create(user: CreateUserRequestDTO): Promise<UserResponseDTO> {
    user.password = await this.passwordService.hashPassword(user.password);
    const createdUser = await this.usersRepository.save(user);
    const preferences = this.configUserPreferences(
      createdUser.vision_impairment,
    );
    createdUser.preferences = await this.preferencesRepository.save({
      user_id: createdUser.id,
      ...preferences,
    });
    return createdUser;
  }

  async findAll(): Promise<GetUserResponseDTO[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<GetUserResponseDTO | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(
    id: string,
    user: UpdateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw;
  }

  async updatePreferences(
    id: string,
    preferences: UpdateUserPreferencesRequestDTO,
  ): Promise<UserPreferencesResponseDTO> {
    const updatedPreferences = await this.preferencesRepository.update(
      id,
      preferences,
    );
    return updatedPreferences.raw;
  }
}
