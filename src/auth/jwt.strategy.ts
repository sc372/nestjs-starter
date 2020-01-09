import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { jwtConstants } from 'src/common/constants'
import { AuthService } from './auth.service'
import { User } from 'src/users/users.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate({ user }): Promise<User> {
    const verifiedUser = await this.authService.validateUserJwt(user.email)
    if (!verifiedUser) throw new UnauthorizedException()

    return verifiedUser
  }
}
