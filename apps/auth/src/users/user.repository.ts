import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    reservationModel: Model<UserDocument>,
  ) {
    super(reservationModel);
  }
}