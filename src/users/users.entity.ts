import {
  Entity,
  BeforeInsert,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { BaseEntity } from '../common/base-entity'
import { Role } from 'src/roles/roles.entity'

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  nickname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: true, name: 'is_active' })
  isActive: boolean

  @Column()
  avatar: string

  // @OneToMany(
  //   () => JwtToken,
  //   token => token.user,
  // )
  // jwtToken: JwtToken;

  @OneToMany(
    () => Role,
    role => role.user,
  )
  @JoinTable()
  roles: Role[]

  @BeforeInsert()
  async beforeInsertion() {
    await this.updatePassword()
  }

  async updatePassword() {
    try {
      const hash = await bcrypt.hash(this.password, 12)
      this.password = hash
    } catch (error) {
      throw error
    }
  }
}
