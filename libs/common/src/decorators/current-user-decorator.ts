import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Users } from '../models/user.schema';

const getUserByContext = (context: ExecutionContext): Users => {
  return context.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_: unknown, context: ExecutionContext) => getUserByContext(context),
);
