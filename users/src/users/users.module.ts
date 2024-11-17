import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME } from './user.constant';

class MockUsersService {
  findUsers() {
    return [{ id: '1', name: 'John Doe' }];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}

@Module({
  controllers: [UsersController],
  providers: [
    // Standard Provider
    UsersService,

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
  ],
})
export class UserModule {}
