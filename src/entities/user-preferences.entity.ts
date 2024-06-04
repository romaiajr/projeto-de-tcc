import { Entity, Column } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InterfaceContrast } from '../enums/user-preferences';
import { DefaultEntity } from '.';

/**
 * Entity representing user preferences.
 * These preferences are set after a user is created. Default values for these preferences will be determined
 * based on the selected value of the visualImpairment enum.
 * For each case of the visualImpairment enum, a default object with these characteristics will be defined.
 */

@Entity('user_preferences')
export class UserPreference extends DefaultEntity {
  @Column()
  audio_description!: boolean;

  @Column()
  font_size!: string;

  @Column({ type: 'enum', enum: InterfaceContrast })
  interface_contrast!: InterfaceContrast;

  user!: User;
}
