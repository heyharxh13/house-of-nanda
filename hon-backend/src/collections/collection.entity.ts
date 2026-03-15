import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('collections')
export class Collection {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ nullable: true })
  badge: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cta: string;

  @Column({ nullable: true })
  accent: string;

  @Column({ type: 'enum', enum: ['women', 'men', 'all'], default: 'all' })
  gender: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
