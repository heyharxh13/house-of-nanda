import { Order } from '../orders/order.entity';
export declare class MailService {
    private transporter;
    sendOrderConfirmation(order: Order, userEmail: string): Promise<void>;
}
