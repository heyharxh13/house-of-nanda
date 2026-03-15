import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    orderId: number;
    productId: string;
    name: string;
    slug: string;
    qty: number;
    price: number;
    size: string;
    image: string;
}
