export interface IDomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
}

export interface IDomainEventHandler<T extends IDomainEvent> {
  handle(event: T): Promise<void> | void;
}

export interface IEventPublisher {
  publish<T extends IDomainEvent>(event: T): Promise<void>;
  publishAll(events: IDomainEvent[]): Promise<void>;
}

export interface IEventSubscriber {
  subscribe<T extends IDomainEvent>(
    eventType: string, 
    handler: IDomainEventHandler<T>
  ): void;
  unsubscribe<T extends IDomainEvent>(
    eventType: string, 
    handler: IDomainEventHandler<T>
  ): void;
}