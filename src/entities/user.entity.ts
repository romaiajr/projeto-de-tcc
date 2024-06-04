import { DefaultEntity } from 'src/entities';
import { Diagram } from 'src/entities/diagram.entity';
import { SharedDiagram } from 'src/entities/shared-diagram.entity';
import { UserPreference } from 'src/entities/user-preferences.entity';
import { VisionImpairment } from 'src/enums/vision-impairment';
import {
  Column,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: VisionImpairment })
  vision_impairment!: VisionImpairment;

  @OneToMany(() => Diagram, (diagram) => diagram.user)
  diagrams!: Diagram[];

  @OneToOne(() => UserPreference, (userPrefence) => userPrefence.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_preferences_id' })
  preferences!: UserPreference;

  @OneToMany(() => SharedDiagram, (sharedDiagram) => sharedDiagram.user)
  shared_diagrams!: SharedDiagram;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}
