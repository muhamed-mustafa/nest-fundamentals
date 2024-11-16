import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { EngineModule } from 'src/engine/engine.module';
import { ConditionerModule } from 'src/conditioner/conditioner.module';

@Module({
  imports: [EngineModule, ConditionerModule],
  controllers: [CarController],
}) 
export class CarModule {}
