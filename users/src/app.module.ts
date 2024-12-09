import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? 'dev.env' : 'staging.env',
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'users/:id', method: RequestMethod.PATCH },
      )
      .forRoutes(UsersController);
    // .forRoutes('*');
  }
}
