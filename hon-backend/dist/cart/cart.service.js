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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const cart_item_entity_1 = require("./cart-item.entity");
const FREE_SHIPPING_THRESHOLD = 999;
let CartService = class CartService {
    constructor(cartRepo, cartItemRepo) {
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
    }
    async getOrCreateCart(userId) {
        let cart = await this.cartRepo.findOne({ where: { userId } });
        if (!cart) {
            cart = this.cartRepo.create({ userId });
            cart = await this.cartRepo.save(cart);
        }
        return this.cartRepo.findOne({ where: { id: cart.id }, relations: ['items', 'items.product'] });
    }
    async addItem(userId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const existing = cart.items?.find((i) => i.productId === dto.productId && i.size === (dto.size || null));
        if (existing) {
            existing.quantity += dto.quantity;
            await this.cartItemRepo.save(existing);
        }
        else {
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
    async updateItem(userId, itemId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const item = await this.cartItemRepo.findOne({ where: { id: itemId, cartId: cart.id } });
        if (!item)
            throw new common_1.NotFoundException(`Cart item #${itemId} not found`);
        if (dto.quantity === 0) {
            await this.cartItemRepo.remove(item);
        }
        else {
            item.quantity = dto.quantity;
            await this.cartItemRepo.save(item);
        }
        return this.getOrCreateCart(userId);
    }
    async removeItem(userId, itemId) {
        const cart = await this.getOrCreateCart(userId);
        const item = await this.cartItemRepo.findOne({ where: { id: itemId, cartId: cart.id } });
        if (!item)
            throw new common_1.NotFoundException(`Cart item #${itemId} not found`);
        await this.cartItemRepo.remove(item);
        return this.getOrCreateCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        await this.cartItemRepo.delete({ cartId: cart.id });
        return { message: 'Cart cleared' };
    }
    async getCartSummary(userId) {
        const cart = await this.getOrCreateCart(userId);
        const subtotal = cart.items?.reduce((sum, i) => sum + Number(i.product?.price || 0) * i.quantity, 0) || 0;
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
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map