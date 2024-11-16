import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { SharedDiagram } from './shared-diagram.entity';
import { DefaultEntity } from './default-entity';
import { User } from 'src/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('diagrams')
export class Diagram extends DefaultEntity {
  @Column({ type: 'text' })
  serialized_object!: string;

  @ManyToOne(() => User, (user) => user.diagrams)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // @OneToMany(() => SharedDiagram, (sharedDiagram) => sharedDiagram.diagram)
  // shared_diagrams!: SharedDiagram[];

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}

export class DiagramDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  serialized_object: string;

  // @ApiProperty()
  // shared_diagrams: UserPreferencesDTO;

  static toDTO(diagram: Diagram): DiagramDTO {
    const diagramDto = new DiagramDTO();
    diagramDto.id = diagram.id;
    diagramDto.serialized_object = diagram.serialized_object;

    return diagramDto;
  }
}
