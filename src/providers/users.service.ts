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
  GetUserResponseDto,
  UserResponseDto,
} from '../interfaces/dto/users/user.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly passwordService: PasswordsService,
  ) {}

  async create(user: CreateUserRequestDTO): Promise<UserResponseDto> {
    user.password = await this.passwordService.hashPassword(user.password);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<GetUserResponseDto[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<GetUserResponseDto | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(
    id: string,
    user: UpdateUserRequestDTO,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersRepository.update(id, user);
    return updatedUser.raw;
  }
}
