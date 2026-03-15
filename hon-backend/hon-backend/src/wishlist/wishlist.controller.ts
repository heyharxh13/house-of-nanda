import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // GET /api/wishlist
  @Get()
  getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  // POST /api/wishlist/:productId — add to wishlist
  @Post(':productId')
  add(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  // POST /api/wishlist/:productId/toggle — add or remove
  @Post(':productId/toggle')
  toggle(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.toggleWishlist(req.user.id, productId);
  }

  // GET /api/wishlist/:productId/check — is in wishlist
  @Get(':productId/check')
  check(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.isInWishlist(req.user.id, productId);
  }

  // DELETE /api/wishlist/:productId
  @Delete(':productId')
  remove(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }

  // DELETE /api/wishlist
  @Delete()
  clearWishlist(@Request() req) {
    return this.wishlistService.clearWishlist(req.user.id);
  }
}
