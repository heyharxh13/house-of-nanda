import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  cta?: string;

  @IsOptional()
  @IsString()
  accent?: string;

  @IsEnum(['women', 'men', 'all'])
  gender: string;
}
