import {
  Entity,
  Column,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SharedDiagram } from './shared-diagram.entity';
import { DefaultEntity } from './default-entity';
import { User } from 'src/entities/user.entity';

@Entity('diagrams')
export class Diagram extends DefaultEntity {
  @Column()
  name!: string;

  @Column({ type: 'text' })
  serialized_object!: string;

  @ManyToOne(() => User, (user) => user.diagrams)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => SharedDiagram, (sharedDiagram) => sharedDiagram.diagram)
  shared_diagrams!: SharedDiagram[];

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}
