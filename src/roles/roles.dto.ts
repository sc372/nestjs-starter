import { RoleType } from "./roles.entity"
import { IsNotEmpty, IsString } from "class-validator"
import { User } from "src/users/users.entity"

export class CreateRoleDto {

  @IsNotEmpty()
  readonly user: User

  @IsNotEmpty()
  readonly role: RoleType
}