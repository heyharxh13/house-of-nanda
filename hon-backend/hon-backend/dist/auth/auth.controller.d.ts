import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<{
        user: Omit<import("../users/user.entity").User, "password">;
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
            role: string;
            addresses: import("../addresses/address.entity").Address[];
            orders: import("../orders/order.entity").Order[];
            wishlistItems: import("../wishlist/wishlist.entity").WishlistItem[];
            carts: import("../cart/cart.entity").Cart[];
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    getMe(req: any): any;
}
