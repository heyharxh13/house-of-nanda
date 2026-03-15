import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
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
    private signToken;
}
