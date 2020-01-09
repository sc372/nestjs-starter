import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  Repository,
  Transaction,
  EntityManager,
  TransactionManager,
} from 'typeorm'
import * as uuid from 'uuid'

import { User } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SignUpDto } from 'src/auth/auth.dto'
import { Role, RoleType } from 'src/roles/roles.entity'
import { RolesService } from 'src/roles/roles.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async findOneWithRole(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    })
  }

  @Transaction()
  async createUser(
    signUpDto: SignUpDto,
    @TransactionManager() entityManager: EntityManager,
  ): Promise<User> {
    const checkUser = await this.findOne(signUpDto.email)
    if (checkUser)
      throw new ConflictException('이미 가입되어 있는 이메일 입니다.')

    const user = new User()
    const role = new Role()

    user.id = uuid.v4()
    user.email = signUpDto.email
    user.password = signUpDto.password
    user.name = signUpDto.name
    user.nickname = signUpDto.name
    user.avatar = ''

    try {
      const newUser = await entityManager.save(user)

      role.id = uuid.v4()
      role.role = RoleType.USER
      role.user = newUser

      await entityManager.save(role)
    } catch (err) {
      throw new InternalServerErrorException()
    }

    return user
  }
}
