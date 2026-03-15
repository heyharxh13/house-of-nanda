import { TestimonialsService } from './testimonials.service';
import { Testimonial } from './testimonial.entity';
export declare class TestimonialsController {
    private readonly testimonialsService;
    constructor(testimonialsService: TestimonialsService);
    create(data: Partial<Testimonial>): Promise<Testimonial>;
    findAll(): Promise<Testimonial[]>;
    findOne(id: string): Promise<Testimonial>;
    update(id: string, data: Partial<Testimonial>): Promise<Testimonial>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
