import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Diagram } from './diagram.entity';
import { User } from 'src/entities/user.entity';
import { AccessPermission } from 'src/enums/access-permission';
import { DefaultEntity } from './default-entity';

@Entity('shared_diagrams')
export class SharedDiagram extends DefaultEntity {
  @Column({ type: 'enum', enum: AccessPermission })
  access_permission!: AccessPermission;

  @ManyToOne(() => Diagram, (diagram) => diagram.shared_diagrams)
  @JoinColumn({ name: 'diagram_id' })
  diagram!: Diagram;

  @ManyToOne(() => User, (user) => user.shared_diagrams)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}
