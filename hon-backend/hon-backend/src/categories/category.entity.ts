import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'pahadi_name', nullable: true })
  pahadiName: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  count: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'enum', enum: ['women', 'men', 'all'], default: 'all' })
  gender: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
