import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  pahadiName?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  count?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(['women', 'men', 'all'])
  gender: string;
}
