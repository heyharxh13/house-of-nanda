import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(req: any, dto: CreateAddressDto): Promise<import("./address.entity").Address>;
    findAll(req: any): Promise<import("./address.entity").Address[]>;
    findOne(req: any, id: string): Promise<import("./address.entity").Address>;
    update(req: any, id: string, dto: Partial<CreateAddressDto>): Promise<import("./address.entity").Address>;
    setDefault(req: any, id: string): Promise<import("./address.entity").Address>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
}
