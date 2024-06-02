import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
} from 'class-validator';
import { VisionImpairment } from 'src/enums/vision-impairment';

export class CreateUserRequestDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail({})
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  @IsEnum(VisionImpairment)
  vision_impairment!: VisionImpairment;
}
