import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
export declare class CollectionsService {
    private readonly collectionRepo;
    constructor(collectionRepo: Repository<Collection>);
    create(dto: CreateCollectionDto): Promise<Collection>;
    findAll(gender?: string): Promise<Collection[]>;
    findOne(id: string): Promise<Collection>;
    update(id: string, dto: Partial<CreateCollectionDto>): Promise<Collection>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
