import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async getProductReviews(productId: string) {
    const reviews = await this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const avg = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return {
      reviews: reviews.map(r => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        verified: r.verified,
        createdAt: r.createdAt,
        userName: r.user?.name || 'Customer',
      })),
      average: Math.round(avg * 10) / 10,
      total: reviews.length,
    };
  }

  async addReview(productId: string, userId: number, rating: number, comment: string) {
    const existing = await this.reviewRepo.findOne({
      where: { product: { id: productId }, user: { id: userId } },
    });
    if (existing) throw new BadRequestException('Aap pehle se review de chuke hain!');

    const review = this.reviewRepo.create({
      rating,
      comment,
      product: { id: productId } as any,
      user: { id: userId } as any,
      verified: true,
    });
    return this.reviewRepo.save(review);
  }

  async getAllReviews() {
    return this.reviewRepo.find({
      relations: ['user', 'product'],
      order: { createdAt: 'DESC' },
    });
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    await this.reviewRepo.remove(review);
    return { message: 'Review deleted successfully' };
  }
}