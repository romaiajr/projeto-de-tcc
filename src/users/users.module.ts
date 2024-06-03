import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PasswordsService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    PasswordsService,
    // ,
    // {
    //   provide: getRepositoryToken(User),
    //   useValue: mockRepository,
    // },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
