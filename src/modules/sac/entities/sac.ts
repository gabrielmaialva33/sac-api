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

@Entity('sacs')
export default class Sac extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column('text')
  description: string;

  @OneToMany(() => Issue, (issue) => issue.sac, { cascade: true })
  issues: Issue[];

  @Column({ default: false, select: false })
  is_deleted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    select: false
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    select: false
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deleted_at: Date;
}
