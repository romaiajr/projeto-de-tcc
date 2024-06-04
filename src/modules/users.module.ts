import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../providers/users.service';
import { User } from '../entities/user.entity';
import { PasswordsService } from '../providers/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, PasswordsService],
  controllers: [UsersController],
})
export class UsersModule {}
