import { Address } from '../addresses/address.entity';
import { Order } from '../orders/order.entity';
import { WishlistItem } from '../wishlist/wishlist.entity';
import { Cart } from '../cart/cart.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    addresses: Address[];
    orders: Order[];
    wishlistItems: WishlistItem[];
    carts: Cart[];
    createdAt: Date;
    updatedAt: Date;
}
