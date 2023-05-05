import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { authorizantionToLoginPayload } from '../utils/base-64-converter';



export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {


  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizantionToLoginPayload(authorization);

  return loginPayload?.id;

});