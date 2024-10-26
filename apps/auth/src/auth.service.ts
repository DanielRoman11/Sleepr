import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}
}
