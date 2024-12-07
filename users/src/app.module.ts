import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
