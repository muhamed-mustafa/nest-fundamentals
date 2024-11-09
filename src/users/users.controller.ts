import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
@Controller('users')
export class UsersController {
  private users: UserEntity[] = [];
  @Get()
  @HttpCode(HttpStatus.OK)
  find(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    const user = { id: uuid(), ...createUserDto };
    this.users.push(user);
    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };

    return this.users[userIndex];
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
