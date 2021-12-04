import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Sac from '@modules/sac/entities/sac';
import Count from '@modules/sac/entities/count';

@Entity('issues')
export default class Issue extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'uuid', select: false })
  sac_id: string;

  @ManyToOne(() => Sac, (sac) => sac.issues)
  @JoinColumn({ name: 'sac_id' })
  sac: Sac;

  @OneToMany(() => Count, (count) => count.issue)
  counts: Count;

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
