import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(body: {
        amount: number;
    }, req: any): Promise<any>;
    verifyPayment(body: any): {
        verified: boolean;
        paymentId: string;
    };
}
