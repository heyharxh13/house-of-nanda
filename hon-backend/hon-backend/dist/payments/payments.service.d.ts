import { ConfigService } from '@nestjs/config';
export declare class PaymentsService {
    private config;
    private razorpay;
    constructor(config: ConfigService);
    createOrder(amount: number, userId: number): Promise<any>;
    verifyPayment(body: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }): {
        verified: boolean;
        paymentId: string;
    };
}
