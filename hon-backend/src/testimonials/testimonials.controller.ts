import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { Testimonial } from './testimonial.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: Partial<Testimonial>) {
    return this.testimonialsService.create(data);
  }

  @Get()
  findAll() {
    return this.testimonialsService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Testimonial>) {
    return this.testimonialsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(+id);
  }
}
