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
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { APP_NAME } from './user.constant';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(APP_NAME) private readonly appName: string,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  find(): UserEntity[] {
    console.log('appName', this.appName);
    return this.usersService.findUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    return this.usersService.findUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
