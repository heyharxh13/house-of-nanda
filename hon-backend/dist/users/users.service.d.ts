import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(dto: CreateUserDto): Promise<Omit<User, 'password'>>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
