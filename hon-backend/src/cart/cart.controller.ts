import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // GET /api/cart — get cart with summary
  @Get()
  getCart(@Request() req) {
    return this.cartService.getCartSummary(req.user.id);
  }

  // POST /api/cart/items — add item to cart
  @Post('items')
  addItem(@Request() req, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(req.user.id, dto);
  }

  // PATCH /api/cart/items/:id — update item quantity
  @Patch('items/:id')
  updateItem(@Request() req, @Param('id') id: string, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateItem(req.user.id, +id, dto);
  }

  // DELETE /api/cart/items/:id — remove item
  @Delete('items/:id')
  removeItem(@Request() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.id, +id);
  }

  // DELETE /api/cart — clear entire cart
  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
