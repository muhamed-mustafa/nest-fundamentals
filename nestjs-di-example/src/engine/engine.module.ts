import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { BatteryModule } from 'src/battery/battery.module';

@Module({
  providers: [EngineService],
  imports: [BatteryModule],
  exports: [EngineService],
})
export class EngineModule {}
