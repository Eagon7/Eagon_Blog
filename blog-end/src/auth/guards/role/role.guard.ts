import { Role } from '@/auth/enum/role'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 这个user是通过jwtGuard 解析 TOKEN后的放到了request上
    const user = context.switchToHttp().getRequest().user as user
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])
    const result = roles.includes(user.role as Role) ? false : true
    return result
  }
}
