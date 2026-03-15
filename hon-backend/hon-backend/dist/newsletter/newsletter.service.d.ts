import { ConfigService } from '@nestjs/config';
export declare class NewsletterService {
    private config;
    constructor(config: ConfigService);
    subscribe(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
