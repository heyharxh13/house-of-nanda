import { User } from '../users/user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: number;
    user: User;
    userId: number;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}
