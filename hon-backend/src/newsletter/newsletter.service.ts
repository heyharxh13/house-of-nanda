import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const mailchimp = require('@mailchimp/mailchimp_marketing');

@Injectable()
export class NewsletterService {
  constructor(private config: ConfigService) {
    mailchimp.setConfig({
      apiKey: this.config.get('MAILCHIMP_API_KEY'),
      server: this.config.get('MAILCHIMP_SERVER'),
    });
  }

  async subscribe(email: string) {
    try {
      await mailchimp.lists.addListMember(
        this.config.get('MAILCHIMP_AUDIENCE_ID'),
        {
          email_address: email,
          status: 'subscribed',
        }
      );
      return { success: true, message: 'Subscribed successfully!' };
    } catch (err: any) {
      const msg = err?.response?.body?.title;
      if (msg === 'Member Exists') {
        return { success: false, message: 'Already subscribed!' };
      }
      throw new BadRequestException('Subscription failed!');
    }
  }
}