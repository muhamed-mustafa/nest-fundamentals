import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe<T> implements PipeTransform<T, string> {
  transform(value: T, _metadata: ArgumentMetadata): string {
    return `HI ${value}`;
  }
}
