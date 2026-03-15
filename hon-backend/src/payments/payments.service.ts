import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(private config: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.config.get('RAZORPAY_KEY_ID'),
      key_secret: this.config.get('RAZORPAY_KEY_SECRET'),
    });
  }

  async createOrder(amount: number, userId: number) {
    const order = await this.razorpay.orders.create({
      amount: amount * 100, // paise mein convert
      currency: 'INR',
      receipt: `order_${userId}_${Date.now()}`,
    });
    return order;
  }

  verifyPayment(body: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', this.config.get('RAZORPAY_KEY_SECRET'))
      .update(sign)
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      throw new BadRequestException('Payment verification failed!');
    }

    return { verified: true, paymentId: razorpay_payment_id };
  }
}