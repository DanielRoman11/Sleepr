import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDocument } from './models/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject()
    private readonly userRepo: UserRepository,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.userRepo.create(createUserDto);
  }

  public async findOne(_id: string) {
    return await this.userRepo.findOne({});
  }

  public async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.findOneAndUpdate(
      { _id },
      { $set: updateUserDto },
    );
  }

  public async delete(_id: string) {
    return await this.userRepo.findOneAndDelete({ _id });
  }
}
