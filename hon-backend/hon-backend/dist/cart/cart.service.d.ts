import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartService {
    private readonly cartRepo;
    private readonly cartItemRepo;
    constructor(cartRepo: Repository<Cart>, cartItemRepo: Repository<CartItem>);
    getOrCreateCart(userId: number): Promise<Cart>;
    addItem(userId: number, dto: AddToCartDto): Promise<Cart>;
    updateItem(userId: number, itemId: number, dto: UpdateCartItemDto): Promise<Cart>;
    removeItem(userId: number, itemId: number): Promise<Cart>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
    getCartSummary(userId: number): Promise<{
        cart: Cart;
        summary: {
            subtotal: number;
            totalItems: number;
            shippingFree: boolean;
            shippingThreshold: number;
            amountToFreeShipping: number;
            currency: string;
        };
    }>;
}
