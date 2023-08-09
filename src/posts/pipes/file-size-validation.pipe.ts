import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const onekb = 1000;
    const requiredKb = onekb * 200;
    if (value.size > requiredKb) {
      throw new BadRequestException('File size must be less than 200kb');
    }
    return value;
  }
}
