import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    // ,
    // {
    //   provide: getRepositoryToken(User),
    //   useValue: mockRepository,
    // },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
