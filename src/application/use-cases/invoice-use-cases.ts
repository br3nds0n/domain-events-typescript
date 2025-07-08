import { InvoiceService } from '../services/invoice.service';

export class GenerateInvoiceUseCase {
  constructor(private invoiceService: InvoiceService) {}

  async execute(orderId: string, amount: number): Promise<void> {
    await this.invoiceService.generateInvoice(orderId, amount);
  }
}