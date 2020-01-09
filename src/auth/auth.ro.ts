import { ApiProperty } from '@nestjs/swagger'
import { UserRo } from 'src/users/users.ro'

export class SignInRo {
  @ApiProperty()
  readonly accessToken: string
  @ApiProperty()
  readonly expiresIn: number
  @ApiProperty()
  readonly tokenType: string
  @ApiProperty()
  readonly user: UserRo
}
