import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // ── Create ────────────────────────────────────────────────────────────────
  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  // ── Find All (with optional filters) ──────────────────────────────────────
  async findAll(filters?: {
    category?: string;
    gender?: string;
    collection?: string;
    badge?: string;
    inStock?: boolean;
    search?: string;
  }): Promise<Product[]> {
    const query = this.productRepo.createQueryBuilder('product');

    if (filters?.category && filters.category !== 'all') {
      query.andWhere('product.category = :category', { category: filters.category });
    }
    if (filters?.gender && filters.gender !== 'all') {
      query.andWhere('product.gender IN (:...genders)', {
        genders: [filters.gender, 'unisex'],
      });
    }
    if (filters?.collection) {
      query.andWhere('product.collection = :collection', { collection: filters.collection });
    }
    if (filters?.badge) {
      query.andWhere('product.badge = :badge', { badge: filters.badge });
    }
    if (filters?.inStock !== undefined) {
      query.andWhere('product.inStock = :inStock', { inStock: filters.inStock });
    }
    if (filters?.search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search OR product.material LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    return query.orderBy('product.createdAt', 'DESC').getMany();
  }

  // ── Find One by ID ─────────────────────────────────────────────────────────
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  // ── Find One by Slug ───────────────────────────────────────────────────────
  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug } });
    if (!product) throw new NotFoundException(`Product with slug "${slug}" not found`);
    return product;
  }

  // ── Related Products ───────────────────────────────────────────────────────
  async findRelated(id: string, limit = 4): Promise<Product[]> {
    const product = await this.findOne(id);
    return this.productRepo
      .createQueryBuilder('p')
      .where('p.id != :id', { id })
      .andWhere('(p.category = :category OR p.gender = :gender)', {
        category: product.category,
        gender: product.gender,
      })
      .limit(limit)
      .getMany();
  }

  // ── Bestsellers ────────────────────────────────────────────────────────────
  async findBestsellers(limit = 8): Promise<Product[]> {
    return this.productRepo.find({
      where: { badge: 'Bestseller' },
      take: limit,
    });
  }

  // ── Update ─────────────────────────────────────────────────────────────────
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { message: `Product #${id} deleted successfully` };
  }

  // ── Toggle Stock ───────────────────────────────────────────────────────────
  async toggleStock(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.inStock = !product.inStock;
    return this.productRepo.save(product);
  }
}
