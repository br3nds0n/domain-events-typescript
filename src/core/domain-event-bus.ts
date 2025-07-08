import { IDomainEvent, IDomainEventHandler, IEventPublisher, IEventSubscriber } from './domain-event';

export class DomainEventBus implements IEventPublisher, IEventSubscriber {
  private handlers: Map<string, Set<IDomainEventHandler<any>>> = new Map();
  private eventHistory: IDomainEvent[] = [];

  subscribe<T extends IDomainEvent>(
    eventType: string, 
    handler: IDomainEventHandler<T>
  ): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    
    this.handlers.get(eventType)!.add(handler);
    console.log(`✅ Handler subscribed to ${eventType}`);
  }

  unsubscribe<T extends IDomainEvent>(
    eventType: string, 
    handler: IDomainEventHandler<T>
  ): void {
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      eventHandlers.delete(handler);
      if (eventHandlers.size === 0) {
        this.handlers.delete(eventType);
      }
    }
  }

  async publish<T extends IDomainEvent>(event: T): Promise<void> {
    this.eventHistory.push(event);
    
    const eventHandlers = this.handlers.get(event.eventType);
    
    if (!eventHandlers || eventHandlers.size === 0) {
      console.log(`⚠️  No handlers found for event ${event.eventType}`);
      return;
    }

    console.log(`📢 Publishing domain event: ${event.eventType}`);
    
    const handlerPromises = Array.from(eventHandlers).map(async handler => {
      try {
        await handler.handle(event);
      } catch (error) {
        console.error(`❌ Error handling event ${event.eventType}:`, error);
      }
    });

    await Promise.all(handlerPromises);
  }

  async publishAll(events: IDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  getEventHistory(): IDomainEvent[] {
    return [...this.eventHistory];
  }

  getSubscribersCount(eventType: string): number {
    return this.handlers.get(eventType)?.size || 0;
  }

  clearHistory(): void {
    this.eventHistory = [];
  }
}