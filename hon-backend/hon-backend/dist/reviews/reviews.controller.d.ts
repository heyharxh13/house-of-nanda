import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviews(productId: string): Promise<{
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
    addReview(productId: string, body: {
        rating: number;
        comment: string;
    }, req: any): Promise<import("./review.entity").Review>;
    getAllReviews(): Promise<import("./review.entity").Review[]>;
    deleteReview(id: string): Promise<{
        message: string;
    }>;
}
