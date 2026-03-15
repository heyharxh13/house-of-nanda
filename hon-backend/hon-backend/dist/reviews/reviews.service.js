"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./review.entity");
let ReviewsService = class ReviewsService {
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }
    async getProductReviews(productId) {
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
    async addReview(productId, userId, rating, comment) {
        const existing = await this.reviewRepo.findOne({
            where: { product: { id: productId }, user: { id: userId } },
        });
        if (existing)
            throw new common_1.BadRequestException('Aap pehle se review de chuke hain!');
        const review = this.reviewRepo.create({
            rating,
            comment,
            product: { id: productId },
            user: { id: userId },
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
    async deleteReview(id) {
        const review = await this.reviewRepo.findOne({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException(`Review #${id} not found`);
        await this.reviewRepo.remove(review);
        return { message: 'Review deleted successfully' };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map