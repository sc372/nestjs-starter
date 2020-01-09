import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { UserRo } from 'src/users/users.ro'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<UserRo> {
    const user: UserRo = await this.authService.validateUser({
      username,
      password,
    })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
