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
import { APP_NAME, USER_HABITS } from './user.constant';
import { UserResponseDto } from './dtos/user-response-dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(APP_NAME) private readonly appName: string,
    @Inject(USER_HABITS) private readonly userHabits: string,
  ) {
    console.log('appName', this.appName);
    console.log('userHabits', this.userHabits);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  find(): UserEntity[] {
    return this.usersService.findUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto {
    return this.usersService.findUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
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
