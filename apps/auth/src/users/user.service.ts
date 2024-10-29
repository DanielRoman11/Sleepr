import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDocument } from './models/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject()
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.isUserAlreadyExist(createUserDto.email);
    return await this.userRepo.create({
      ...createUserDto,
      password: await hash(
        createUserDto.password,
        Number(this.configService.get<number>('HASH_ROUNDS')),
      ),
    });
  }

  private async isUserAlreadyExist(email: string) {
    try {
      await this.findOneByEmail(email);
    } catch {
      return;
    }
    throw new UnprocessableEntityException('This email is already taken');
  }

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOneByEmail(username);
    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userRepo.findOne({ email });
  }

  public async findOne(_id: string) {
    return await this.userRepo.findOne({ _id });
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userRepo.findOne({ ...getUserDto });
  }

  public async find(): Promise<UserDocument[]> {
    return await this.userRepo.find({});
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
