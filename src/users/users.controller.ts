import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindOneParams } from 'src/interfaces/find-one-params.validation';
import { CreateUserRequestDTO } from 'src/users/dto/user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserRequestDTO, @Res() res: Response) {
    const createdUser = await this.usersService.create(user);
    return res.status(HttpStatus.CREATED).send(createdUser);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).send(users);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return 'This action returns a user';
  }
}
