import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { MailService } from '../mail/mail.service';
import { User } from '../users/user.entity';
export declare class OrdersService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly userRepo;
    private readonly mailService;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, userRepo: Repository<User>, mailService: MailService);
    create(userId: number, dto: CreateOrderDto): Promise<Order>;
    findAllForUser(userId: number): Promise<Order[]>;
    findOne(id: number, userId: number): Promise<Order>;
    findAll(): Promise<Order[]>;
    updateStatus(id: number, status: OrderStatus): Promise<Order>;
    addTracking(id: number, trackingNumber: string): Promise<Order>;
    cancelOrder(id: number, userId: number): Promise<Order>;
    trackByEmailAndId(orderId: number, email: string): Promise<Order>;
}
