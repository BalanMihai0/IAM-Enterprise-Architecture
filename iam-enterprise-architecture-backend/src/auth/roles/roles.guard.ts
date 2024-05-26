import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const authHeader = context.switchToHttp().getRequest().headers.authorization;

    //By default give 401 unauthorized if there is no authHeader with token and Roles("*") is not specified
    //If there is a Roles("*") above the endpoint, it allows to access it at any case (doesn't matter if token exists/isValid and etc.)
    if (!authHeader && (!requiredRoles || !requiredRoles.includes("*"))) {
      throw new UnauthorizedException("Token is missing!");
    } else if (requiredRoles.includes("*")) {
      return true;
    }
    //If there is a role(s) specified: Roles("{RoleName}") It starts checking a token and see if it's valid and contains a specified role(s)
    const token = authHeader.split(' ')[1];
    const decoded: any = jwtDecode(token);

    if (requiredRoles.includes(decoded.role)) {
      return true;
    } else {
      throw new ForbiddenException("Insufficient permissions!");
    }
  }
}
