import { EmailService, WelcomeEmailData, OrderConfirmationData } from '../services/email.service';

export class SendWelcomeEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(data: WelcomeEmailData): Promise<void> {
    await this.emailService.sendWelcomeEmail(data);
  }
}

export class SendOrderConfirmationUseCase {
  constructor(private emailService: EmailService) {}

  async execute(data: OrderConfirmationData): Promise<void> {
    await this.emailService.sendOrderConfirmation(data);
  }
}