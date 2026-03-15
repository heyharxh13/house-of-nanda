import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  id: string;

  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  pahadiName?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  originalPrice: number;

  @IsNumber()
  @Min(0)
  discount: number;

  @IsEnum(['gold', 'silver'])
  category: string;

  @IsEnum(['women', 'men', 'unisex'])
  gender: string;

  @IsString()
  collection: string;

  @IsString()
  material: string;

  @IsOptional()
  @IsEnum(['New', 'Bestseller', 'Limited', 'Trending'])
  badge?: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  culturalNote?: string;

  @IsArray()
  @IsString({ each: true })
  details: string[];

  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];
}
