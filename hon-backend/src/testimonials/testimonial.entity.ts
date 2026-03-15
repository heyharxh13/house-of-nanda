import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 5 })
  initial: string;

  @Column()
  location: string;

  @Column()
  product: string;

  @Column()
  category: string;

  @Column({ type: 'tinyint', default: 5 })
  rating: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
