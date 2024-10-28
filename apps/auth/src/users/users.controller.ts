import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDocument } from './models/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectIdPipe } from '../pipes/objectId-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.userService.find();
  }

  @Get(':id')
  findUser(@Param('id', new ObjectIdPipe()) id: string): Promise<UserDocument> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', new ObjectIdPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', new ObjectIdPipe()) id: string,
  ): Promise<UserDocument> {
    return this.userService.delete(id);
  }
}
