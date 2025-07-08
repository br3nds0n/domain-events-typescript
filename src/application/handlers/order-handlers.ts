import { IDomainEventHandler } from '../../core/domain-event';
import { OrderPlacedEvent, OrderPaidEvent, OrderShippedEvent } from '../../domain/events/order-events';
import { ReserveInventoryUseCase } from '../use-cases/inventory-use-cases';
import { SendOrderConfirmationUseCase } from '../use-cases/email-use-cases';
import { GenerateInvoiceUseCase } from '../use-cases/invoice-use-cases';

export class ReserveInventoryHandler implements IDomainEventHandler<OrderPlacedEvent> {
  constructor(private reserveInventoryUseCase: ReserveInventoryUseCase) {}

  async handle(event: OrderPlacedEvent): Promise<void> {
    for (const item of event.items) {
      await this.reserveInventoryUseCase.execute(item.productId, item.quantity);
    }
  }
}

export class SendOrderConfirmationHandler implements IDomainEventHandler<OrderPlacedEvent> {
  constructor(private sendOrderConfirmationUseCase: SendOrderConfirmationUseCase) {}

  async handle(event: OrderPlacedEvent): Promise<void> {
    await this.sendOrderConfirmationUseCase.execute({
      orderId: event.aggregateId,
      userId: event.userId,
      items: event.items,
      totalAmount: event.totalAmount
    });
  }
}

export class GenerateInvoiceHandler implements IDomainEventHandler<OrderPaidEvent> {
  constructor(private generateInvoiceUseCase: GenerateInvoiceUseCase) {}

  async handle(event: OrderPaidEvent): Promise<void> {
    await this.generateInvoiceUseCase.execute(event.aggregateId, event.amount);
  }
}

export class TrackShippedOrderHandler implements IDomainEventHandler<OrderShippedEvent> {
  async handle(event: OrderShippedEvent): Promise<void> {
    console.log(`Order shipped: ${event.aggregateId}, Tracking: ${event.trackingNumber}, Method: ${event.shippingMethod}`);
  }
}