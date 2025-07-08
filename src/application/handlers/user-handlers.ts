import { IDomainEventHandler } from '../../core/domain-event';
import { UserRegisteredEvent, UserEmailChangedEvent } from '../../domain/events/user-events';
import { SendWelcomeEmailUseCase } from '../use-cases/email-use-cases';
import { CreateUserProfileUseCase } from '../use-cases/user-use-cases';

export class SendWelcomeEmailHandler implements IDomainEventHandler<UserRegisteredEvent> {
  constructor(private sendWelcomeEmailUseCase: SendWelcomeEmailUseCase) {}

  async handle(event: UserRegisteredEvent): Promise<void> {
    await this.sendWelcomeEmailUseCase.execute({
      to: event.email,
      userName: event.name,
      userId: event.aggregateId
    });
  }
}

export class CreateUserProfileHandler implements IDomainEventHandler<UserRegisteredEvent> {
  constructor(private createUserProfileUseCase: CreateUserProfileUseCase) {}

  async handle(event: UserRegisteredEvent): Promise<void> {
    await this.createUserProfileUseCase.execute(event.name);
  }
}