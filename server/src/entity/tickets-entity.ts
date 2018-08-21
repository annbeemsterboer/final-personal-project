import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
  // OneToMany
} from 'typeorm'
import { IsString } from 'class-validator'

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  eventId: number

  @Column('int')
  price: number

  @IsString()
  @Column('text')
  description: string

  @Column('text')
  imgUrl?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Column('text')
  userId: number
}

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  ticketId: number

  @IsString()
  @Column('text')
  comment: string

  @Column('int')
  userId: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
