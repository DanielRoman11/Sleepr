import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './models/users.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
