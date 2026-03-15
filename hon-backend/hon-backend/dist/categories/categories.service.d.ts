import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(gender?: string): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    findBySlug(slug: string): Promise<Category>;
    update(id: number, dto: Partial<CreateCategoryDto>): Promise<Category>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
