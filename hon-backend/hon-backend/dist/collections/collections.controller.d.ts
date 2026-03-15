import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    create(dto: CreateCollectionDto): Promise<import("./collection.entity").Collection>;
    findAll(gender?: string): Promise<import("./collection.entity").Collection[]>;
    findOne(id: string): Promise<import("./collection.entity").Collection>;
    update(id: string, dto: Partial<CreateCollectionDto>): Promise<import("./collection.entity").Collection>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
