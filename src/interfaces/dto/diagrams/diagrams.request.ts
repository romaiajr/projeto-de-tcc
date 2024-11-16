import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateDiagramRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  serialized_object!: string;
}

export class UpdateDiagramRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  serialized_object!: string;
}
