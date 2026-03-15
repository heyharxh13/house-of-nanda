import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: CreateUserDto): Promise<Omit<import("./user.entity").User, "password">>;
    getMe(req: any): Promise<import("./user.entity").User>;
    updateMe(req: any, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: string): Promise<import("./user.entity").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
