import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { VALIDATE_FIELD_KEY } from '../constrains';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) dto establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exceptions based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const fieldsValidate = this.reflector.get<string[]>(
      VALIDATE_FIELD_KEY,
      context.getHandler(),
    );

    if (fieldsValidate) {
      for (const field of fieldsValidate) {
        console.log(user[field]);
        if (typeof user[field] === 'object' && !user[field].length) {
          throw new HttpException(
            {
              statusCode: HttpStatus.PAYMENT_REQUIRED,
              message: `You need add ${field} before using service`,
              error: 'validate',
            },
            HttpStatus.PAYMENT_REQUIRED,
          );
        }
        if (!user[field]) {
          throw new HttpException(
            {
              statusCode: HttpStatus.PAYMENT_REQUIRED,
              message: `You need add ${field} before using service`,
              error: 'validate',
            },
            HttpStatus.PAYMENT_REQUIRED,
          );
        }
      }
    }
    return user;
  }
}
