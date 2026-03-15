import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Order } from '../orders/order.entity';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Gmail App Password
    },
  });

  async sendOrderConfirmation(order: Order, userEmail: string) {
    const estimatedDelivery = new Date(order.createdAt);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
    const deliveryStr = estimatedDelivery.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    const itemsHtml = order.items.map((item) => `
  <tr>
    <td style="padding:10px 0; border-bottom:1px solid #f0e6d3;">
      <strong style="color:#1a1a1a;">${item.name}</strong>
      ${item.size ? `<br/><span style="color:#888;font-size:12px;">Size: ${item.size}</span>` : ''}
    </td>
    <td style="padding:10px 0; border-bottom:1px solid #f0e6d3; text-align:center; color:#555;">
      x${item.qty}
    </td>
    <td style="padding:10px 0; border-bottom:1px solid #f0e6d3; text-align:right; color:#1a1a1a;">
      ₹${Number(item.price * item.qty).toLocaleString('en-IN')}
    </td>
  </tr>
`).join('');

    const address: any = order.shippingAddress || {};

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f8f4ef;font-family:'Georgia',serif;">

  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#111;padding:36px 40px;text-align:center;">
      <h1 style="color:#c9a96e;font-size:22px;letter-spacing:4px;margin:0;font-weight:400;">
        HOUSE OF NANDA
      </h1>
      <p style="color:#888;font-size:11px;letter-spacing:2px;margin:8px 0 0;">— Wear the Legacy —</p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">

      <h2 style="color:#1a1a1a;font-size:20px;font-weight:400;margin:0 0 8px;">
        Order Confirmed ✓
      </h2>
      <p style="color:#555;font-size:14px;margin:0 0 28px;line-height:1.6;">
        Thank you for your order. We'll begin crafting your pieces right away.
      </p>

      <!-- Order Meta -->
      <div style="background:#f8f4ef;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#888;font-size:12px;letter-spacing:1px;">ORDER ID</td>
            <td style="color:#888;font-size:12px;letter-spacing:1px;">DATE</td>
            <td style="color:#888;font-size:12px;letter-spacing:1px;">EST. DELIVERY</td>
          </tr>
          <tr>
            <td style="color:#1a1a1a;font-size:15px;font-weight:bold;padding-top:6px;">
              #${order.id}
            </td>
            <td style="color:#1a1a1a;font-size:13px;padding-top:6px;">
              ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </td>
            <td style="color:#c9a96e;font-size:13px;padding-top:6px;font-weight:bold;">
              ${deliveryStr}
            </td>
          </tr>
        </table>
      </div>

      <!-- Items -->
      <h3 style="color:#1a1a1a;font-size:13px;letter-spacing:2px;margin:0 0 12px;font-weight:400;">
        YOUR PIECES
      </h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        ${itemsHtml}
      </table>

      <!-- Totals -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td style="color:#888;font-size:13px;padding:4px 0;">Subtotal</td>
          <td style="color:#555;font-size:13px;text-align:right;">₹${Number(order.subtotal).toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td style="color:#888;font-size:13px;padding:4px 0;">Shipping</td>
          <td style="color:#555;font-size:13px;text-align:right;">
            ${Number(order.shipping) === 0 ? '<span style="color:#4caf50;">Free</span>' : `₹${Number(order.shipping).toLocaleString('en-IN')}`}
          </td>
        </tr>
        <tr>
          <td style="color:#1a1a1a;font-size:16px;font-weight:bold;padding-top:10px;border-top:1px solid #f0e6d3;">
            Total
          </td>
          <td style="color:#c9a96e;font-size:16px;font-weight:bold;text-align:right;padding-top:10px;border-top:1px solid #f0e6d3;">
            ₹${Number(order.total).toLocaleString('en-IN')}
          </td>
        </tr>
      </table>

      <!-- Delivery Address -->
      ${address.fullName ? `
      <div style="background:#f8f4ef;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
        <p style="color:#888;font-size:11px;letter-spacing:1px;margin:0 0 8px;">DELIVERY ADDRESS</p>
        <p style="color:#1a1a1a;font-size:13px;line-height:1.8;margin:0;">
          ${address.fullName}<br/>
          ${address.line1}${address.line2 ? ', ' + address.line2 : ''}<br/>
          ${address.city}, ${address.state} - ${address.pincode}<br/>
          ${address.phone ? `📞 ${address.phone}` : ''}
        </p>
      </div>
      ` : ''}

      <p style="color:#888;font-size:13px;line-height:1.7;margin:0;">
        Questions? Reply to this email or contact us at
        <a href="mailto:support@houseofnanda.com" style="color:#c9a96e;">support@houseofnanda.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f8f4ef;padding:20px 40px;text-align:center;border-top:1px solid #ede0d0;">
      <p style="color:#aaa;font-size:11px;letter-spacing:1px;margin:0;">
        © ${new Date().getFullYear()} HOUSE OF NANDA — ALL RIGHTS RESERVED
      </p>
    </div>

  </div>
</body>
</html>
    `;

    await this.transporter.sendMail({
      from: `"House of Nanda" <${process.env.MAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmed #${order.id} — House of Nanda`,
      html,
    });
  }
}