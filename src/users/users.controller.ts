import {
  Controller,
  Request,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { RoleType } from 'src/roles/roles.entity'
import { ApiResponse } from '@nestjs/swagger'
import { UserRo } from './users.ro'

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor() {}

  @ApiResponse({
    status: 200,
    type: UserRo,
    description: 'Get profile, response user',
  })
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN, RoleType.USER)
  getUser(@Request() req): UserRo {
    return req.user
  }
}
