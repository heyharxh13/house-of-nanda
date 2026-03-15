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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collection_entity_1 = require("./collection.entity");
let CollectionsService = class CollectionsService {
    constructor(collectionRepo) {
        this.collectionRepo = collectionRepo;
    }
    async create(dto) {
        const collection = this.collectionRepo.create(dto);
        return this.collectionRepo.save(collection);
    }
    async findAll(gender) {
        if (gender && gender !== 'all') {
            return this.collectionRepo
                .createQueryBuilder('c')
                .where('c.gender = :gender OR c.gender = :all', { gender, all: 'all' })
                .getMany();
        }
        return this.collectionRepo.find();
    }
    async findOne(id) {
        const collection = await this.collectionRepo.findOne({ where: { id } });
        if (!collection)
            throw new common_1.NotFoundException(`Collection "${id}" not found`);
        return collection;
    }
    async update(id, dto) {
        const collection = await this.findOne(id);
        Object.assign(collection, dto);
        return this.collectionRepo.save(collection);
    }
    async remove(id) {
        const collection = await this.findOne(id);
        await this.collectionRepo.remove(collection);
        return { message: `Collection "${id}" deleted` };
    }
};
exports.CollectionsService = CollectionsService;
exports.CollectionsService = CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollectionsService);
//# sourceMappingURL=collections.service.js.map