import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('product/:productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('product/:productId')
  addReview(
    @Param('productId') productId: string,
    @Body() body: { rating: number; comment: string },
    @Request() req: any,
  ) {
    return this.reviewsService.addReview(productId, req.user.id, body.rating, body.comment);
  }

  // GET /api/reviews/admin/all — Admin: get all reviews
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  // DELETE /api/reviews/:id — Admin: delete review
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReview(+id);
  }
}