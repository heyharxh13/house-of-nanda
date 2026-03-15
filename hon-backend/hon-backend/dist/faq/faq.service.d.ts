import { Repository } from 'typeorm';
import { Faq } from './faq.entity';
export declare class FaqService {
    private readonly faqRepo;
    constructor(faqRepo: Repository<Faq>);
    create(data: Partial<Faq>): Promise<Faq>;
    findAll(): Promise<{
        category: string;
        questions: Faq[];
    }[]>;
    findOne(id: number): Promise<Faq>;
    update(id: number, data: Partial<Faq>): Promise<Faq>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
