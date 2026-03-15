import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /api/products — Admin: create product
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // GET /api/products — List all with optional filters
  // ?category=gold&gender=women&collection=heritage&badge=Bestseller&inStock=true&search=jhumka
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('gender') gender?: string,
    @Query('collection') collection?: string,
    @Query('badge') badge?: string,
    @Query('inStock') inStock?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll({
      category,
      gender,
      collection,
      badge,
      inStock: inStock !== undefined ? inStock === 'true' : undefined,
      search,
    });
  }

  // GET /api/products/bestsellers
  @Get('bestsellers')
  findBestsellers(@Query('limit') limit?: string) {
    return this.productsService.findBestsellers(limit ? +limit : 8);
  }

  // GET /api/products/slug/:slug — Find by slug (for frontend product pages)
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // GET /api/products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // GET /api/products/:id/related
  @Get(':id/related')
  findRelated(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.productsService.findRelated(id, limit ? +limit : 4);
  }

  // PATCH /api/products/:id — Admin: update product
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  // PATCH /api/products/:id/toggle-stock — Admin: toggle in stock
  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-stock')
  toggleStock(@Param('id') id: string) {
    return this.productsService.toggleStock(id);
  }

  // DELETE /api/products/:id — Admin: delete product
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
