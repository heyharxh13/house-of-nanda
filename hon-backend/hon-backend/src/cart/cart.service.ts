import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

const FREE_SHIPPING_THRESHOLD = 999;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
  ) {}

  // Get or create cart for user
  async getOrCreateCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({ where: { userId } });
    if (!cart) {
      cart = this.cartRepo.create({ userId });
      cart = await this.cartRepo.save(cart);
    }
    return this.cartRepo.findOne({ where: { id: cart.id }, relations: ['items', 'items.product'] });
  }

  // Add item to cart
  async addItem(userId: number, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    // Check if same product+size already in cart
    const existing = cart.items?.find(
      (i) => i.productId === dto.productId && i.size === (dto.size || null),
    );

    if (existing) {
      existing.quantity += dto.quantity;
      await this.cartItemRepo.save(existing);
    } else {
      const item = this.cartItemRepo.create({
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
        size: dto.size,
      });
      await this.cartItemRepo.save(item);
    }

    return this.getOrCreateCart(userId);
  }

  // Update item quantity (0 = remove)
  async updateItem(userId: number, itemId: number, dto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.cartItemRepo.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw new NotFoundException(`Cart item #${itemId} not found`);

    if (dto.quantity === 0) {
      await this.cartItemRepo.remove(item);
    } else {
      item.quantity = dto.quantity;
      await this.cartItemRepo.save(item);
    }

    return this.getOrCreateCart(userId);
  }

  // Remove item
  async removeItem(userId: number, itemId: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const item = await this.cartItemRepo.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw new NotFoundException(`Cart item #${itemId} not found`);
    await this.cartItemRepo.remove(item);
    return this.getOrCreateCart(userId);
  }

  // Clear entire cart
  async clearCart(userId: number): Promise<{ message: string }> {
    const cart = await this.getOrCreateCart(userId);
    await this.cartItemRepo.delete({ cartId: cart.id });
    return { message: 'Cart cleared' };
  }

  // Get cart summary (subtotal, shipping info)
  async getCartSummary(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    const subtotal = cart.items?.reduce(
      (sum, i) => sum + Number(i.product?.price || 0) * i.quantity, 0
    ) || 0;
    const totalItems = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

    return {
      cart,
      summary: {
        subtotal,
        totalItems,
        shippingFree: subtotal >= FREE_SHIPPING_THRESHOLD || totalItems === 0,
        shippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
        currency: 'INR',
      },
    };
  }
}
