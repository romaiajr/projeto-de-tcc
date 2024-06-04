import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindOneParams } from 'src/interfaces/find-one-params.validation';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from 'src/interfaces/dto/users/user.request';
import { UsersService } from '../providers/users.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetUserResponseDto,
  UserResponseDto,
} from '../interfaces/dto/users/user.response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ type: UserResponseDto })
  @Post()
  async create(
    @Body() createUserDto: CreateUserRequestDTO,
    @Res() res: Response,
  ) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).send(user);
  }

  @ApiResponse({ type: [GetUserResponseDto] })
  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).send(users);
  }

  @ApiResponse({ type: GetUserResponseDto })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOne(@Param() params: FindOneParams, @Res() res: Response) {
    const user = await this.usersService.findOne(params.id);
    return res.status(HttpStatus.OK).send(user);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async remove(@Param() params: FindOneParams, @Res() res: Response) {
    await this.usersService.remove(params.id);
    return res.status(HttpStatus.OK).send();
  }

  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: UserResponseDto })
  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserRequestDTO,
    @Param() params: FindOneParams,
    @Res() res: Response,
  ) {
    await this.usersService.update(params.id, updateUserDto);
    return res.status(HttpStatus.OK).send();
  }
}
