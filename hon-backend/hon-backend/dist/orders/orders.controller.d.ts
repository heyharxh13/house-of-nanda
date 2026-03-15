import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.entity';
export declare class OrdersPublicController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    trackOrder(body: {
        orderId: number;
        email: string;
    }): Promise<import("./order.entity").Order>;
}
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<import("./order.entity").Order>;
    findAll(req: any): Promise<import("./order.entity").Order[]>;
    findAllAdmin(): Promise<import("./order.entity").Order[]>;
    findOne(req: any, id: string): Promise<import("./order.entity").Order>;
    cancel(req: any, id: string): Promise<import("./order.entity").Order>;
    updateStatus(id: string, status: OrderStatus): Promise<import("./order.entity").Order>;
    addTracking(id: string, trackingNumber: string): Promise<import("./order.entity").Order>;
}
