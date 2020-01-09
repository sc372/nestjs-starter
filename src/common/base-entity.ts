import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { IsUUID } from 'class-validator'

export abstract class BaseEntity {
  @PrimaryColumn()
  @IsUUID()
  id: string

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date
}
