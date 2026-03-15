"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductsService = class ProductsService {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async create(dto) {
        const product = this.productRepo.create(dto);
        return this.productRepo.save(product);
    }
    async findAll(filters) {
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
            query.andWhere('(product.name LIKE :search OR product.description LIKE :search OR product.material LIKE :search)', { search: `%${filters.search}%` });
        }
        return query.orderBy('product.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Product #${id} not found`);
        return product;
    }
    async findBySlug(slug) {
        const product = await this.productRepo.findOne({ where: { slug } });
        if (!product)
            throw new common_1.NotFoundException(`Product with slug "${slug}" not found`);
        return product;
    }
    async findRelated(id, limit = 4) {
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
    async findBestsellers(limit = 8) {
        return this.productRepo.find({
            where: { badge: 'Bestseller' },
            take: limit,
        });
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
        return { message: `Product #${id} deleted successfully` };
    }
    async toggleStock(id) {
        const product = await this.findOne(id);
        product.inStock = !product.inStock;
        return this.productRepo.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map