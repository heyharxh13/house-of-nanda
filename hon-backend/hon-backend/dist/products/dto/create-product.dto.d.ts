export declare class CreateProductDto {
    id: string;
    slug: string;
    name: string;
    pahadiName?: string;
    price: number;
    originalPrice: number;
    discount: number;
    category: string;
    gender: string;
    collection: string;
    material: string;
    badge?: string;
    images: string[];
    description: string;
    culturalNote?: string;
    details: string[];
    inStock: boolean;
    sizes?: string[];
}
