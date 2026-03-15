import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { MailService } from '../mail/mail.service';
import { User } from '../users/user.entity';

const SHIPPING_THRESHOLD = 999;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(userId: number, dto: CreateOrderDto): Promise<Order> {
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
      status: OrderStatus.PENDING,
    });

    const saved = await this.orderRepo.save(order);

    const items = dto.items.map((i) =>
      this.orderItemRepo.create({ ...i, orderId: saved.id }),
    );
    await this.orderItemRepo.save(items);

    const finalOrder = await this.findOne(saved.id, userId);

    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (user?.email) {
        await this.mailService.sendOrderConfirmation(finalOrder, user.email);
      }
    } catch (err) {
      console.error('Order confirmation email failed:', err);
    }

    return finalOrder;
  }

  async findAllForUser(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    if (order.userId !== userId) throw new ForbiddenException('Access denied');
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    order.status = status;
    return this.orderRepo.save(order);
  }

  async addTracking(id: number, trackingNumber: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    order.trackingNumber = trackingNumber;
    order.status = OrderStatus.SHIPPED;
    return this.orderRepo.save(order);
  }

  async cancelOrder(id: number, userId: number): Promise<Order> {
    const order = await this.findOne(id, userId);
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new ForbiddenException('Order cannot be cancelled at this stage');
    }
    order.status = OrderStatus.CANCELLED;
    return this.orderRepo.save(order);
  }

  async trackByEmailAndId(orderId: number, email: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'user'],
    });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    if (order.user?.email?.toLowerCase() !== email.toLowerCase()) {
      throw new ForbiddenException('Access denied');
    }
    return order;
  }
}