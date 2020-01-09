import { ApiProperty } from '@nestjs/swagger'

export class UserRo {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly name: string
  @ApiProperty()
  readonly nickname: string
  @ApiProperty()
  readonly email: string
  @ApiProperty()
  readonly avatar: string
}
