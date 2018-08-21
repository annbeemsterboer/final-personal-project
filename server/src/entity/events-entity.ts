import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column

  // OneToMany
} from 'typeorm'
import { MinLength, IsString } from 'class-validator'

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column('text')
  eventName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  description: string

  @Column('text', { nullable: true })
  imgUrl: string

  @Column('date', { nullable: true })
  startDate: Date

  @Column('date', { nullable: true })
  endDate?: Date

  @Column('int', { nullable: true })
  userId: number
}
