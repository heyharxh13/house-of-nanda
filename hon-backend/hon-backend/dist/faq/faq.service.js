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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faq_entity_1 = require("./faq.entity");
let FaqService = class FaqService {
    constructor(faqRepo) {
        this.faqRepo = faqRepo;
    }
    async create(data) {
        const faq = this.faqRepo.create(data);
        return this.faqRepo.save(faq);
    }
    async findAll() {
        const faqs = await this.faqRepo.find({
            where: { active: true },
            order: { category: 'ASC', sortOrder: 'ASC' },
        });
        const grouped = {};
        for (const faq of faqs) {
            if (!grouped[faq.category])
                grouped[faq.category] = [];
            grouped[faq.category].push(faq);
        }
        return Object.entries(grouped).map(([category, questions]) => ({
            category,
            questions,
        }));
    }
    async findOne(id) {
        const faq = await this.faqRepo.findOne({ where: { id } });
        if (!faq)
            throw new common_1.NotFoundException(`FAQ #${id} not found`);
        return faq;
    }
    async update(id, data) {
        const faq = await this.findOne(id);
        Object.assign(faq, data);
        return this.faqRepo.save(faq);
    }
    async remove(id) {
        const faq = await this.findOne(id);
        await this.faqRepo.remove(faq);
        return { message: `FAQ #${id} deleted` };
    }
};
exports.FaqService = FaqService;
exports.FaqService = FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.Faq)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FaqService);
//# sourceMappingURL=faq.service.js.map