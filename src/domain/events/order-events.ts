import { IDomainEvent } from '../../core/domain-event';
import { generateId } from '../../shared/utils';
import { OrderItem } from '../entities/order';

export class OrderPlacedEvent implements IDomainEvent {
  readonly eventId: string;
  readonly eventType = 'OrderPlaced';
  readonly occurredOn: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: number
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}

export class OrderPaidEvent implements IDomainEvent {
  readonly eventId: string;
  readonly eventType = 'OrderPaid';
  readonly occurredOn: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly paymentId: string,
    public readonly paymentMethod: string,
    public readonly amount: number
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}

export class OrderShippedEvent implements IDomainEvent {
  readonly eventId: string;
  readonly eventType = 'OrderShipped';
  readonly occurredOn: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly trackingNumber: string,
    public readonly shippingMethod: string
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}