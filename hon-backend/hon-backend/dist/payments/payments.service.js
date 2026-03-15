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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const Razorpay = require('razorpay');
let PaymentsService = class PaymentsService {
    constructor(config) {
        this.config = config;
        this.razorpay = new Razorpay({
            key_id: this.config.get('RAZORPAY_KEY_ID'),
            key_secret: this.config.get('RAZORPAY_KEY_SECRET'),
        });
    }
    async createOrder(amount, userId) {
        const order = await this.razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `order_${userId}_${Date.now()}`,
        });
        return order;
    }
    verifyPayment(body) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', this.config.get('RAZORPAY_KEY_SECRET'))
            .update(sign)
            .digest('hex');
        if (expectedSign !== razorpay_signature) {
            throw new common_1.BadRequestException('Payment verification failed!');
        }
        return { verified: true, paymentId: razorpay_payment_id };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map