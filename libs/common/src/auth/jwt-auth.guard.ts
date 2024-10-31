import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, pipe, tap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (jwt) {
      this.authClient.send('authenticate', {
        Authentication: jwt,
      }),
        pipe(
          tap((res: Response) => {
            context.switchToHttp().getRequest().user = res;
          }),
          map(() => true),
        );
      return true;
    } else return false;
  }
}
