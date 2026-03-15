import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepo: Repository<Testimonial>,
  ) {}

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    const testimonial = this.testimonialRepo.create(data);
    return this.testimonialRepo.save(testimonial);
  }

  async findAll(activeOnly = true): Promise<Testimonial[]> {
    return this.testimonialRepo.find({
      where: activeOnly ? { active: true } : {},
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Testimonial> {
    const t = await this.testimonialRepo.findOne({ where: { id } });
    if (!t) throw new NotFoundException(`Testimonial #${id} not found`);
    return t;
  }

  async update(id: number, data: Partial<Testimonial>): Promise<Testimonial> {
    const t = await this.findOne(id);
    Object.assign(t, data);
    return this.testimonialRepo.save(t);
  }

  async remove(id: number): Promise<{ message: string }> {
    const t = await this.findOne(id);
    await this.testimonialRepo.remove(t);
    return { message: `Testimonial #${id} deleted` };
  }
}
