import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';
import { Collection } from '../collections/collection.entity';
import { User } from '../users/user.entity';
import { Address } from '../addresses/address.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { WishlistItem } from '../wishlist/wishlist.entity';
import { Order } from '../orders/order.entity';
import { OrderItem } from '../orders/order-item.entity';
import { Testimonial } from '../testimonials/testimonial.entity';
import { Faq } from '../faq/faq.entity';
import { Review } from '../reviews/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get('DB_USERNAME', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'house_of_nanda'),
        entities: [
          Product,
          Category,
          Collection,
          User,
          Address,
          Cart,
          CartItem,
          WishlistItem,
          Order,
          OrderItem,
          Testimonial,
          Faq,
          Review,
        ],
        // Auto-create tables in dev — use migrations in production
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class DatabaseModule {}
