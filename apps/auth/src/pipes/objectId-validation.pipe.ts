import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }
    if (value && value.length !== 24) {
      throw new BadRequestException('This not an ObjectId');
    }
    return value;
  }
}
