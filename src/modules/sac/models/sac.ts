import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Issue from './issue';

//import { Exclude, Expose } from 'class-transformer';

@Entity('sacs')
export default class Sac extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
