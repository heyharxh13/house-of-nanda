import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';
export declare class TestimonialsService {
    private readonly testimonialRepo;
    constructor(testimonialRepo: Repository<Testimonial>);
    create(data: Partial<Testimonial>): Promise<Testimonial>;
    findAll(activeOnly?: boolean): Promise<Testimonial[]>;
    findOne(id: number): Promise<Testimonial>;
    update(id: number, data: Partial<Testimonial>): Promise<Testimonial>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
