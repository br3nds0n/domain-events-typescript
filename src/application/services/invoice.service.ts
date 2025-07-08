export class InvoiceService {
  async generateInvoice(orderId: string, amount: number): Promise<void> {
    console.log(`🧾 Generating invoice for order ${orderId}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Invoice generated for order ${orderId}`);
  }
}