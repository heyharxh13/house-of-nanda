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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const order_item_entity_1 = require("./order-item.entity");
const mail_service_1 = require("../mail/mail.service");
const user_entity_1 = require("../users/user.entity");
const SHIPPING_THRESHOLD = 999;
let OrdersService = class OrdersService {
    constructor(orderRepo, orderItemRepo, userRepo, mailService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.userRepo = userRepo;
        this.mailService = mailService;
    }
    async create(userId, dto) {
        const shipping = dto.subtotal >= SHIPPING_THRESHOLD ? 0 : 99;
        const total = dto.subtotal + shipping;
        const order = this.orderRepo.create({
            userId,
            subtotal: dto.subtotal,
            shipping,
            total,
            currency: 'INR',
            orderNote: dto.orderNote,
            shippingAddress: dto.shippingAddress,
            status: order_entity_1.OrderStatus.PENDING,
        });
        const saved = await this.orderRepo.save(order);
        const items = dto.items.map((i) => this.orderItemRepo.create({ ...i, orderId: saved.id }));
        await this.orderItemRepo.save(items);
        const finalOrder = await this.findOne(saved.id, userId);
        try {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (user?.email) {
                await this.mailService.sendOrderConfirmation(finalOrder, user.email);
            }
        }
        catch (err) {
            console.error('Order confirmation email failed:', err);
        }
        return finalOrder;
    }
    async findAllForUser(userId) {
        return this.orderRepo.find({
            where: { userId },
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return order;
    }
    async findAll() {
        return this.orderRepo.find({
            relations: ['items', 'user'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateStatus(id, status) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        order.status = status;
        return this.orderRepo.save(order);
    }
    async addTracking(id, trackingNumber) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        order.trackingNumber = trackingNumber;
        order.status = order_entity_1.OrderStatus.SHIPPED;
        return this.orderRepo.save(order);
    }
    async cancelOrder(id, userId) {
        const order = await this.findOne(id, userId);
        if (order.status !== order_entity_1.OrderStatus.PENDING && order.status !== order_entity_1.OrderStatus.CONFIRMED) {
            throw new common_1.ForbiddenException('Order cannot be cancelled at this stage');
        }
        order.status = order_entity_1.OrderStatus.CANCELLED;
        return this.orderRepo.save(order);
    }
    async trackByEmailAndId(orderId, email) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
            relations: ['items', 'user'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order #${orderId} not found`);
        if (order.user?.email?.toLowerCase() !== email.toLowerCase()) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map