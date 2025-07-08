import { IDomainEvent } from './domain-event';

export abstract class AggregateRoot {
  private _domainEvents: IDomainEvent[] = [];
  private _version: number = 0;

  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

  getUncommittedEvents(): IDomainEvent[] {
    return [...this._domainEvents];
  }

  markEventsAsCommitted(): void {
    this._domainEvents = [];
  }

  getVersion(): number {
    return this._version;
  }

  protected incrementVersion(): void {
    this._version++;
  }
}