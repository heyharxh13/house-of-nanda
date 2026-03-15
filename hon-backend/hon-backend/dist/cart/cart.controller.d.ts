import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        cart: import("./cart.entity").Cart;
        summary: {
            subtotal: number;
            totalItems: number;
            shippingFree: boolean;
            shippingThreshold: number;
            amountToFreeShipping: number;
            currency: string;
        };
    }>;
    addItem(req: any, dto: AddToCartDto): Promise<import("./cart.entity").Cart>;
    updateItem(req: any, id: string, dto: UpdateCartItemDto): Promise<import("./cart.entity").Cart>;
    removeItem(req: any, id: string): Promise<import("./cart.entity").Cart>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
