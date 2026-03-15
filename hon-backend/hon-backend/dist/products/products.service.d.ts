import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    create(dto: CreateProductDto): Promise<Product>;
    findAll(filters?: {
        category?: string;
        gender?: string;
        collection?: string;
        badge?: string;
        inStock?: boolean;
        search?: string;
    }): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    findBySlug(slug: string): Promise<Product>;
    findRelated(id: string, limit?: number): Promise<Product[]>;
    findBestsellers(limit?: number): Promise<Product[]>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
    toggleStock(id: string): Promise<Product>;
}
