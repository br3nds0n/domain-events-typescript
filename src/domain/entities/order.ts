import { AggregateRoot } from '../../core/aggregate-root';
import { OrderPlacedEvent, OrderPaidEvent, OrderShippedEvent } from '../events/order-events';
import { generateId } from '../../shared/utils';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export class Order extends AggregateRoot {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    private _items: OrderItem[],
    private _totalAmount: number,
    private _status: OrderStatus,
    private _createdAt: Date
  ) {
    super();
  }

  static create(userId: string, items: OrderItem[]): Order {
    const orderId = generateId();
    const totalAmount = items.reduce(
      (sum, item) => sum + (item.unitPrice * item.quantity), 
      0
    );

    const order = new Order(
      orderId,
      userId,
      items,
      totalAmount,
      OrderStatus.PENDING,
      new Date()
    );

    order.addDomainEvent(new OrderPlacedEvent(orderId, userId, items, totalAmount));
    order.incrementVersion();

    return order;
  }

  get items(): OrderItem[] {
    return [...this._items];
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  markAsPaid(paymentId: string, paymentMethod: string): void {
    if (this._status !== OrderStatus.PENDING) {
      throw new Error(`Cannot mark order as paid. Current status: ${this._status}`);
    }

    this._status = OrderStatus.PAID;
    this.addDomainEvent(new OrderPaidEvent(this.id, paymentId, paymentMethod, this._totalAmount));
    this.incrementVersion();
  }

  ship(trackingNumber: string, shippingMethod: string): void {
    if (this._status !== OrderStatus.PAID) {
      throw new Error(`Cannot ship order. Current status: ${this._status}`);
    }

    this._status = OrderStatus.SHIPPED;
    this.addDomainEvent(new OrderShippedEvent(this.id, trackingNumber, shippingMethod));
    this.incrementVersion();
  }
}