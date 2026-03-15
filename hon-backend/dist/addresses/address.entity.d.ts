import { User } from '../users/user.entity';
export declare class Address {
    id: number;
    user: User;
    userId: number;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
