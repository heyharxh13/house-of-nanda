import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
  ) {}

  async create(dto: CreateCollectionDto): Promise<Collection> {
    const collection = this.collectionRepo.create(dto);
    return this.collectionRepo.save(collection);
  }

  async findAll(gender?: string): Promise<Collection[]> {
    if (gender && gender !== 'all') {
      return this.collectionRepo
        .createQueryBuilder('c')
        .where('c.gender = :gender OR c.gender = :all', { gender, all: 'all' })
        .getMany();
    }
    return this.collectionRepo.find();
  }

  async findOne(id: string): Promise<Collection> {
    const collection = await this.collectionRepo.findOne({ where: { id } });
    if (!collection) throw new NotFoundException(`Collection "${id}" not found`);
    return collection;
  }

  async update(id: string, dto: Partial<CreateCollectionDto>): Promise<Collection> {
    const collection = await this.findOne(id);
    Object.assign(collection, dto);
    return this.collectionRepo.save(collection);
  }

  async remove(id: string): Promise<{ message: string }> {
    const collection = await this.findOne(id);
    await this.collectionRepo.remove(collection);
    return { message: `Collection "${id}" deleted` };
  }
}
