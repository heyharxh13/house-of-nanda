import { Repository } from 'typeorm';
import { Review } from './review.entity';
export declare class ReviewsService {
    private reviewRepo;
    constructor(reviewRepo: Repository<Review>);
    getProductReviews(productId: string): Promise<{
        reviews: {
            id: number;
            rating: number;
            comment: string;
            verified: boolean;
            createdAt: Date;
            userName: string;
        }[];
        average: number;
        total: number;
    }>;
    addReview(productId: string, userId: number, rating: number, comment: string): Promise<Review>;
    getAllReviews(): Promise<Review[]>;
    deleteReview(id: number): Promise<{
        message: string;
    }>;
}
