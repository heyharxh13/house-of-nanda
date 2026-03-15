import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ name: 'pahadi_name', nullable: true })
  pahadiName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ name: 'original_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  originalPrice: number;

  @Column({ type: 'int', default: 0 })
  discount: number;

  @Column({ type: 'enum', enum: ['gold', 'silver'] })
  category: string;

  @Column({ type: 'enum', enum: ['women', 'men', 'unisex'] })
  gender: string;

  @Column()
  collection: string;

  @Column()
  material: string;

  @Column({
    type: 'enum',
    enum: ['New', 'Bestseller', 'Limited', 'Trending'],
    nullable: true,
  })
  badge: string;

  // Store as JSON array of image URLs
  @Column({ type: 'json' })
  images: string[];

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'cultural_note', type: 'text', nullable: true })
  culturalNote: string;

  // Store product detail bullets as JSON array
  @Column({ type: 'json' })
  details: string[];

  @Column({ name: 'in_stock', default: true })
  inStock: boolean;

  // Store ring sizes as JSON array e.g. ["5","6","7"]
  @Column({ type: 'json', nullable: true })
  sizes: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
