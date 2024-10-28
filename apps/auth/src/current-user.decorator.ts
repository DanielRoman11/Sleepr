import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { UserDocument } from './users/models/users.schema';

function getCurrentUserByContext(ctx: ExecutionContextHost): UserDocument {
  return ctx.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContextHost) => getCurrentUserByContext(ctx),
);
