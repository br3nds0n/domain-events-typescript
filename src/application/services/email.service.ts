export interface WelcomeEmailData {
  to: string;
  userName: string;
  userId: string;
}

export interface OrderConfirmationData {
  orderId: string;
  userId: string;
  items: any[];
  totalAmount: number;
}

export class EmailService {
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
    console.log(`📧 Sending welcome email to ${data.to}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Welcome email sent to ${data.userName}`);
  }

  async sendOrderConfirmation(data: OrderConfirmationData): Promise<void> {
    console.log(`📧 Sending order confirmation for ${data.orderId}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Order confirmation sent`);
  }

  async sendShippingNotification(data: any): Promise<void> {
    console.log(`📧 Sending shipping notification`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Shipping notification sent`);
  }
}