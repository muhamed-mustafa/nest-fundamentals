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
  Req,
  UseGuards,
  SetMetadata,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { APP_NAME, USER_HABITS } from './user.constant';
import { UserResponseDto } from './dtos/user-response-dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { Public } from 'src/common/decorators/public-decorator';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  PORT: number;
  EMAIL: string;
}

@Controller('users')
export class UsersController {
  private logger: Logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(APP_NAME) private readonly appName: string,
    @Inject(USER_HABITS) private readonly userHabits: string,
  ) {
    console.log('process', process.env.DATABASE_NAME);
    console.log(
      'configService',
      this.configService.get('PORT', 'default value'),
    );
  }

  // @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request): Promise<UserEntity[]> {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    this.logger.log(`AppName: ${this.appName}`);
    this.logger.log(`UserHabits: ${this.userHabits}`);

    const users =  this.usersService.findUsers();

    this.logger.debug(`Users: ${users.length}`);
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto {
    return this.usersService.findUserById(id);
  }

  // @SetMetadata('isPublic', true)
  @Public()
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
