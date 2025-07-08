import { Order, OrderItem } from '../../domain/entities/order';
import { DomainEventBus } from '../../core/domain-event-bus';
import { IOrderRepository } from '../../infrastructure/repositories/order.repository';

export class OrderApplicationService {
  constructor(
    private eventBus: DomainEventBus,
    private orderRepository: IOrderRepository
  ) {}

  async createOrder(userId: string, items: OrderItem[]): Promise<string> {
    const order = Order.create(userId, items);
    await this.orderRepository.save(order);

    const events = order.getUncommittedEvents();
    await this.eventBus.publishAll(events);
    order.markEventsAsCommitted();

    return order.id;
  }

  async processPayment(orderId: string, paymentId: string, paymentMethod: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.markAsPaid(paymentId, paymentMethod);
    await this.orderRepository.save(order);

    const events = order.getUncommittedEvents();
    await this.eventBus.publishAll(events);
    order.markEventsAsCommitted();
  }

  async shipOrder(orderId: string, trackingNumber: string, shippingMethod: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.ship(trackingNumber, shippingMethod);
    await this.orderRepository.save(order);

    const events = order.getUncommittedEvents();
    await this.eventBus.publishAll(events);
    order.markEventsAsCommitted();
  }
}