import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { VisionImpairment } from 'src/enums/vision-impairment';
import { User } from '../../../entities/user.entity';
import { Diagram } from 'src/entities/diagram.entity';
import { UserPreference } from 'src/entities/user-preferences.entity';
import { SharedDiagram } from 'src/entities/shared-diagram.entity';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ enum: VisionImpairment })
  vision_impairment: VisionImpairment;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class GetUserResponseDto extends UserResponseDto {
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  preferences: UserPreference;

  @ApiProperty()
  diagrams: Diagram[];

  @ApiProperty()
  shared_diagrams: SharedDiagram;

  constructor(partial: Partial<User>) {
    super(partial);
  }
}
