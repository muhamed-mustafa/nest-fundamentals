import { Injectable } from '@nestjs/common';

@Injectable()
export class BatteryService {
  powerSupply(): boolean {
    return true;
  }
}
