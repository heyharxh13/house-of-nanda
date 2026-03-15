import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
export declare class WishlistItem {
    id: number;
    user: User;
    userId: number;
    product: Product;
    productId: string;
    createdAt: Date;
}
