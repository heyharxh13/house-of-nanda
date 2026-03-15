import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    findAll(gender?: string): Promise<import("./category.entity").Category[]>;
    findBySlug(slug: string): Promise<import("./category.entity").Category>;
    findOne(id: string): Promise<import("./category.entity").Category>;
    update(id: string, dto: Partial<CreateCategoryDto>): Promise<import("./category.entity").Category>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
