import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /api/payments/create-order
  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  createOrder(@Body() body: { amount: number }, @Request() req) {
    return this.paymentsService.createOrder(body.amount, req.user.id);
  }

  // POST /api/payments/verify
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  verifyPayment(@Body() body: any) {
    return this.paymentsService.verifyPayment(body);
  }
}