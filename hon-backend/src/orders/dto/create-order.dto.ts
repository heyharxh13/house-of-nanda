import { IsArray, IsOptional, IsString, IsNumber, ValidateNested, Min, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsNumber()
  @Min(1)
  qty: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  subtotal: number;

  @IsOptional()
  @IsString()
  orderNote?: string;

  @IsOptional()
  @IsObject()
  shippingAddress?: object;

  @IsOptional()
  @IsNumber()
  addressId?: number;
}
