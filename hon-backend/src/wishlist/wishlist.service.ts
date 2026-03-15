import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private readonly wishlistRepo: Repository<WishlistItem>,
  ) {}

  async getWishlist(userId: number): Promise<WishlistItem[]> {
    return this.wishlistRepo.find({
      where: { userId },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async addToWishlist(userId: number, productId: string): Promise<WishlistItem> {
    const existing = await this.wishlistRepo.findOne({ where: { userId, productId } });
    if (existing) throw new ConflictException('Product already in wishlist');

    const item = this.wishlistRepo.create({ userId, productId });
    return this.wishlistRepo.save(item);
  }

  async removeFromWishlist(userId: number, productId: string): Promise<{ message: string }> {
    const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Item not in wishlist');
    await this.wishlistRepo.remove(item);
    return { message: 'Removed from wishlist' };
  }

  async toggleWishlist(userId: number, productId: string): Promise<{ action: string; item?: WishlistItem }> {
    const existing = await this.wishlistRepo.findOne({ where: { userId, productId } });
    if (existing) {
      await this.wishlistRepo.remove(existing);
      return { action: 'removed' };
    }
    const item = await this.wishlistRepo.save(this.wishlistRepo.create({ userId, productId }));
    return { action: 'added', item };
  }

  async isInWishlist(userId: number, productId: string): Promise<boolean> {
    const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
    return !!item;
  }

  async clearWishlist(userId: number): Promise<{ message: string }> {
    await this.wishlistRepo.delete({ userId });
    return { message: 'Wishlist cleared' };
  }
}
