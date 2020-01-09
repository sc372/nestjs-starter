import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { SignInDto, SignUpDto } from './auth.dto'
import { SignInRo } from './auth.ro'
import { User } from 'src/users/users.entity'
import { EntityManager, TransactionManager } from 'typeorm'
import { UserRo } from 'src/users/users.ro'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<UserRo | null> {
    const user = await this.usersService.findOne(signInDto.username)

    if (user && bcrypt.compareSync(signInDto.password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async validateUserJwt(email: string): Promise<User> {
    const userRes = await this.usersService.findOneWithRole(email)

    if (!userRes)
      throw new UnauthorizedException('존재하지 않는 이메일 입니다.')

    return userRes
  }

  async signIn(signInDto: SignInDto): Promise<SignInRo> {
    const userRes: User = await this.usersService.findOne(signInDto.username)
    if (!userRes)
      throw new UnauthorizedException('해당 이메일을 찾을 수 없습니다.')

    const { password, ...result } = userRes
    const payload = { id: userRes.id, user: result }

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 2592000,
      tokenType: 'Bearer',
      user: result,
    }
  }

  async signUp(
    signUpDto: SignUpDto,
    @TransactionManager() entityManager: EntityManager,
  ): Promise<SignInRo> {
    const userRes = await this.usersService.createUser(signUpDto, entityManager)

    const { password, ...result } = userRes
    const payload = { id: userRes.id, user: result }

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 2592000,
      tokenType: 'Bearer',
      user: result,
    }
  }
}
