import {
  Controller,
  Body,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { SignInDto, SignUpDto } from './auth.dto'
import { SignInRo } from './auth.ro'
import { TransactionManager, EntityManager } from 'typeorm'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    type: SignInRo,
    description: 'Success sign in, response user and auth',
  })
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInUserDto: SignInDto): Promise<SignInRo> {
    return await this.authService.signIn(signInUserDto)
  }

  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    type: SignInRo,
    description: 'Success sign up, response user and auth',
  })
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @TransactionManager() entityManager: EntityManager,
  ): Promise<SignInRo> {
    return await this.authService.signUp(signUpDto, entityManager)
  }
}
