import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    verified: boolean;
    user: User;
    product: Product;
    createdAt: Date;
}
