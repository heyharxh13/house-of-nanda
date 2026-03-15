import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(req: any): Promise<import("./wishlist.entity").WishlistItem[]>;
    add(req: any, productId: string): Promise<import("./wishlist.entity").WishlistItem>;
    toggle(req: any, productId: string): Promise<{
        action: string;
        item?: import("./wishlist.entity").WishlistItem;
    }>;
    check(req: any, productId: string): Promise<boolean>;
    remove(req: any, productId: string): Promise<{
        message: string;
    }>;
    clearWishlist(req: any): Promise<{
        message: string;
    }>;
}
