import { Entity, Column } from 'typeorm';
import { User } from 'src/users/user.entity';
import {
  InterfaceColor,
  InterfaceContrast,
  SystemColor,
} from '../enums/user-preferences';
import { DefaultEntity } from '.';

/**
 * Entity representing user preferences.
 * These preferences are set after a user is created. Default values for these preferences will be determined
 * based on the selected value of the visualImpairment enum.
 * For each case of the visualImpairment enum, a default object with these characteristics will be defined.
 */

@Entity('user_preferences')
export class UserPreference extends DefaultEntity {
  @Column({ nullable: true })
  audio_description!: boolean;

  @Column({ nullable: true })
  font_size!: string;

  @Column({ type: 'enum', enum: SystemColor })
  system_color!: SystemColor;

  @Column({ nullable: true })
  interface_font_size!: string;

  // Criar enum
  @Column({ type: 'enum', enum: InterfaceColor })
  interface_color!: InterfaceColor;

  // Criar enum
  @Column({ type: 'enum', enum: InterfaceContrast })
  interface_contrast!: InterfaceContrast;

  user!: User;
}
