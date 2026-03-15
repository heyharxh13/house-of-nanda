import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressesService {
    private readonly addressRepo;
    constructor(addressRepo: Repository<Address>);
    create(userId: number, dto: CreateAddressDto): Promise<Address>;
    findAllForUser(userId: number): Promise<Address[]>;
    findOne(id: number, userId: number): Promise<Address>;
    update(id: number, userId: number, dto: Partial<CreateAddressDto>): Promise<Address>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
    setDefault(id: number, userId: number): Promise<Address>;
}
