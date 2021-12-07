import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Issue from './issue';

@Entity('counts')
export default class Count extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  issue_id: string;

  @Column({ default: false, select: false })
  is_deleted: boolean;

  @ManyToOne(() => Issue, (issue) => issue.counts)
  @JoinColumn({ name: 'issue_id' })
  issue: Issue;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone'
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
