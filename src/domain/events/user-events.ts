import { IDomainEvent } from '../../core/domain-event';
import { generateId } from '../../shared/utils';

export class UserRegisteredEvent implements IDomainEvent {
  readonly eventId: string;
  readonly eventType = 'UserRegistered';
  readonly occurredOn: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly email: string,
    public readonly name: string
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}

export class UserEmailChanged implements IDomainEvent {
  readonly eventId: string;
  readonly eventType = 'UserEmailChanged';
  readonly occurredOn: Date;

  constructor(
    public readonly aggregateId: string,
    public readonly oldEmail: string,
    public readonly newEmail: string
  ) {
    this.eventId = generateId();
    this.occurredOn = new Date();
  }
}