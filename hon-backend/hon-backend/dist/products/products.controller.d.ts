import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<import("./product.entity").Product>;
    findAll(category?: string, gender?: string, collection?: string, badge?: string, inStock?: string, search?: string): Promise<import("./product.entity").Product[]>;
    findBestsellers(limit?: string): Promise<import("./product.entity").Product[]>;
    findBySlug(slug: string): Promise<import("./product.entity").Product>;
    findOne(id: string): Promise<import("./product.entity").Product>;
    findRelated(id: string, limit?: string): Promise<import("./product.entity").Product[]>;
    update(id: string, dto: UpdateProductDto): Promise<import("./product.entity").Product>;
    toggleStock(id: string): Promise<import("./product.entity").Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
