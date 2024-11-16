import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InterfaceContrast } from 'src/enums/user-preferences';

export class UpdateUserPreferencesRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
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
