import {
  Controller, Get, Post, Body, Param, Patch,
  UseGuards, Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// ─── PUBLIC: Guest order tracking ───────────────────────────
@Controller('orders')
export class OrdersPublicController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('track')
  trackOrder(@Body() body: { orderId: number; email: string }) {
    return this.ordersService.trackByEmailAndId(body.orderId, body.email);
  }
}
// ────────────────────────────────────────────────────────────

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /api/orders — place order
  @Post()
  create(@Request() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, dto);
  }

  // GET /api/orders — user's orders
  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAllForUser(req.user.id);
  }

  // GET /api/orders/admin — all orders (admin)
  @Get('admin')
  findAllAdmin() {
    return this.ordersService.findAll();
  }

  // GET /api/orders/:id
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(+id, req.user.id);
  }

  // PATCH /api/orders/:id/cancel
  @Patch(':id/cancel')
  cancel(@Request() req, @Param('id') id: string) {
    return this.ordersService.cancelOrder(+id, req.user.id);
  }

  // PATCH /api/orders/:id/status — admin update status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(+id, status);
  }

  // PATCH /api/orders/:id/tracking — admin add tracking
  @Patch(':id/tracking')
  addTracking(@Param('id') id: string, @Body('trackingNumber') trackingNumber: string) {
    return this.ordersService.addTracking(+id, trackingNumber);
  }
}
