import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare class Order {
    id: number;
    user: User;
    userId: number;
    items: OrderItem[];
    status: OrderStatus;
    subtotal: number;
    shipping: number;
    total: number;
    currency: string;
    orderNote: string;
    shippingAddress: object;
    trackingNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
