export declare class OrderItemDto {
    productId: string;
    name: string;
    slug: string;
    qty: number;
    price: number;
    size?: string;
    image?: string;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    subtotal: number;
    orderNote?: string;
    shippingAddress?: object;
    addressId?: number;
}
