import { FaqService } from './faq.service';
import { Faq } from './faq.entity';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    create(data: Partial<Faq>): Promise<Faq>;
    findAll(): Promise<{
        category: string;
        questions: Faq[];
    }[]>;
    findOne(id: string): Promise<Faq>;
    update(id: string, data: Partial<Faq>): Promise<Faq>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
