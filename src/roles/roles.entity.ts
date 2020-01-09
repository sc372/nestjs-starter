import { BaseEntity } from 'src/common/base-entity'
import { User } from 'src/users/users.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('roles')
export class Role extends BaseEntity {
  @Column({
    type: 'enum',
    enum: RoleType,
  })
  role: RoleType

  @ManyToOne(
    () => User,
    user => user.roles,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  user: User
}
