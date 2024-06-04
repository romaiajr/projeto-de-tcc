import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserPreference } from 'src/entities/user-preferences.entity';
import { InterfaceContrast } from 'src/enums/user-preferences';

export class UserPreferencesResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  audio_description: boolean;

  @ApiProperty()
  font_size: string;

  @ApiProperty({ enum: InterfaceContrast })
  interface_contrast!: InterfaceContrast;

  @Exclude()
  user_id: string;

  constructor(partial: Partial<UserPreference>) {
    Object.assign(this, partial);
  }
}
