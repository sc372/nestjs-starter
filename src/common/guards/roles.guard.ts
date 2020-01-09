import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { everyInclude } from '../utils/array.util'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) true

    const request = context.switchToHttp().getRequest()
    const user = request.user

    const userHasRole = user.roles.map(v => v.role)
    const hasRole = () => everyInclude(userHasRole, roles)

    return user && user.roles && hasRole()
  }
}
