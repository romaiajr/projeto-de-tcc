import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InterfaceContrast } from 'src/enums/user-preferences';

export class UserPreferencesDTO {
  audio_description!: boolean;
  font_size!: string;
  interface_contrast!: InterfaceContrast;
}

export class UpdateUserPreferencesRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  audio_description!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  font_size!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InterfaceContrast)
  interface_contrast!: InterfaceContrast;
}
