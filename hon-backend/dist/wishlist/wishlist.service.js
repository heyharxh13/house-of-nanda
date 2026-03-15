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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./wishlist.entity");
let WishlistService = class WishlistService {
    constructor(wishlistRepo) {
        this.wishlistRepo = wishlistRepo;
    }
    async getWishlist(userId) {
        return this.wishlistRepo.find({
            where: { userId },
            relations: ['product'],
            order: { createdAt: 'DESC' },
        });
    }
    async addToWishlist(userId, productId) {
        const existing = await this.wishlistRepo.findOne({ where: { userId, productId } });
        if (existing)
            throw new common_1.ConflictException('Product already in wishlist');
        const item = this.wishlistRepo.create({ userId, productId });
        return this.wishlistRepo.save(item);
    }
    async removeFromWishlist(userId, productId) {
        const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
        if (!item)
            throw new common_1.NotFoundException('Item not in wishlist');
        await this.wishlistRepo.remove(item);
        return { message: 'Removed from wishlist' };
    }
    async toggleWishlist(userId, productId) {
        const existing = await this.wishlistRepo.findOne({ where: { userId, productId } });
        if (existing) {
            await this.wishlistRepo.remove(existing);
            return { action: 'removed' };
        }
        const item = await this.wishlistRepo.save(this.wishlistRepo.create({ userId, productId }));
        return { action: 'added', item };
    }
    async isInWishlist(userId, productId) {
        const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
        return !!item;
    }
    async clearWishlist(userId) {
        await this.wishlistRepo.delete({ userId });
        return { message: 'Wishlist cleared' };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.WishlistItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map