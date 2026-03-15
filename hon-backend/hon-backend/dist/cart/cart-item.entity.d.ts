import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';
export declare class CartItem {
    id: number;
    cart: Cart;
    cartId: number;
    product: Product;
    productId: string;
    quantity: number;
    size: string;
}
