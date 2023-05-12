import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   *
   * @param err
   * @param user
   * @param info
   * @param context
   */
  handleRequest(err, user, info, context: ExecutionContext) {
    console.log('user:', user);
    // You can throw an exceptions based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const databaseAccess = this.reflector.get<string[]>(
      'databases',
      context.getHandler(),
    );
    if (!user.roles || !user.permissions) {
      throw new UnauthorizedException();
    }
    return this.matchPermission(user, permissions, databaseAccess);
  }

  matchPermission(user, permissions, databaseAccess) {
    if (!databaseAccess || !databaseAccess.length) {
      throw new UnauthorizedException({
        code: HttpStatus.FORBIDDEN,
        error: 'Access denied',
      });
    }
    const hasAccessDb = user.permissions.find((elem: any) =>
      databaseAccess.includes(elem.model),
    );

    if (!hasAccessDb) {
      throw new UnauthorizedException({
        code: HttpStatus.FORBIDDEN,
        error: 'Database access denied',
      });
    }

    const hasPermission = hasAccessDb.actions.find((elm) => {
      return permissions.includes(elm);
    });

    if (!hasPermission) {
      throw new UnauthorizedException({
        code: HttpStatus.FORBIDDEN,
        error: `Your do not permission ${permissions.pop()} in model ${databaseAccess.pop()}`,
      });
    }
    return user;
  }
}
