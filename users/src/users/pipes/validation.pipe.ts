import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return `HI ${value}`;
  }
}
