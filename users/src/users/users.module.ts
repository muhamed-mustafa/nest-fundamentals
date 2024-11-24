import { ClassSerializerInterceptor, Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME, USER_HABITS } from './user.constant';
import { APP_INTERCEPTOR } from '@nestjs/core';

class MockUsersService {
  findUsers() {
    return [{ id: '1', name: 'John Doe' }];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}

@Injectable()
class UserHabitsFactory {
  getUserHabits() {
    return ['reading', 'coding', 'sleeping'];
  }
}

@Injectable()
class DataBaseConnection {
  async connect() {
    return await Promise.resolve('Connected to the database');
  }
}

@Injectable()
class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

const loggerAliasProvider = {
  provide: 'loggerAlias',
  useExisting: LoggerService,
};

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // Standard Provider
    UsersService,
    UserHabitsFactory,
    DataBaseConnection,
    LoggerService,
    loggerAliasProvider,
    // Custom Provider
    // 1) Value based Provider

    // {
    //   provide: UsersService,
    //   useClass: MockUsersService,
    // },

    {
      provide: APP_NAME,
      useValue: 'NestJS',
    },

    // 2) Class based Provider
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV !== 'production'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },

    // 3) Factory based Provider
    {
      provide: USER_HABITS,
      // useFactory: () => ['reading', 'coding'],
      useFactory: async (
        userHabitsFactory: UserHabitsFactory,
        dbConnection: DataBaseConnection,
      ) => {
        const db = await dbConnection.connect();
        console.log(db);
        return userHabitsFactory.getUserHabits();
      },
      inject: [UserHabitsFactory, DataBaseConnection],
    },
  ],

  exports: [USER_HABITS], // Exporting USER_HABITS to other modules by using token
})
export class UserModule {}
