"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailchimp = require('@mailchimp/mailchimp_marketing');
let NewsletterService = class NewsletterService {
    constructor(config) {
        this.config = config;
        mailchimp.setConfig({
            apiKey: this.config.get('MAILCHIMP_API_KEY'),
            server: this.config.get('MAILCHIMP_SERVER'),
        });
    }
    async subscribe(email) {
        try {
            await mailchimp.lists.addListMember(this.config.get('MAILCHIMP_AUDIENCE_ID'), {
                email_address: email,
                status: 'subscribed',
            });
            return { success: true, message: 'Subscribed successfully!' };
        }
        catch (err) {
            const msg = err?.response?.body?.title;
            if (msg === 'Member Exists') {
                return { success: false, message: 'Already subscribed!' };
            }
            throw new common_1.BadRequestException('Subscription failed!');
        }
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map