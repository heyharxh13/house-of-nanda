import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}

  async create(data: Partial<Faq>): Promise<Faq> {
    const faq = this.faqRepo.create(data);
    return this.faqRepo.save(faq);
  }

  // Returns FAQs grouped by category
  async findAll(): Promise<{ category: string; questions: Faq[] }[]> {
    const faqs = await this.faqRepo.find({
      where: { active: true },
      order: { category: 'ASC', sortOrder: 'ASC' },
    });

    const grouped: Record<string, Faq[]> = {};
    for (const faq of faqs) {
      if (!grouped[faq.category]) grouped[faq.category] = [];
      grouped[faq.category].push(faq);
    }

    return Object.entries(grouped).map(([category, questions]) => ({
      category,
      questions,
    }));
  }

  async findOne(id: number): Promise<Faq> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) throw new NotFoundException(`FAQ #${id} not found`);
    return faq;
  }

  async update(id: number, data: Partial<Faq>): Promise<Faq> {
    const faq = await this.findOne(id);
    Object.assign(faq, data);
    return this.faqRepo.save(faq);
  }

  async remove(id: number): Promise<{ message: string }> {
    const faq = await this.findOne(id);
    await this.faqRepo.remove(faq);
    return { message: `FAQ #${id} deleted` };
  }
}
