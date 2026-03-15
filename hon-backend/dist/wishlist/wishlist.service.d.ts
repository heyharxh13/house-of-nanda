import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist.entity';
export declare class WishlistService {
    private readonly wishlistRepo;
    constructor(wishlistRepo: Repository<WishlistItem>);
    getWishlist(userId: number): Promise<WishlistItem[]>;
    addToWishlist(userId: number, productId: string): Promise<WishlistItem>;
    removeFromWishlist(userId: number, productId: string): Promise<{
        message: string;
    }>;
    toggleWishlist(userId: number, productId: string): Promise<{
        action: string;
        item?: WishlistItem;
    }>;
    isInWishlist(userId: number, productId: string): Promise<boolean>;
    clearWishlist(userId: number): Promise<{
        message: string;
    }>;
}
