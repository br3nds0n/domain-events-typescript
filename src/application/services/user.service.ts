import { User } from '../../domain/entities/user';
import { DomainEventBus } from '../../core/domain-event-bus';
import { IUserRepository } from '../../infrastructure/repositories/user.repository';

export class UserApplicationService {
  constructor(
    private eventBus: DomainEventBus,
    private userRepository: IUserRepository
  ) {}

  async registerUser(email: string, name: string): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(email, name);
    await this.userRepository.save(user);

    const events = user.getUncommittedEvents();
    await this.eventBus.publishAll(events);
    user.markEventsAsCommitted();

    return user.id;
  }

  async changeUserEmail(userId: string, newEmail: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.changeEmail(newEmail);
    await this.userRepository.save(user);

    const events = user.getUncommittedEvents();
    await this.eventBus.publishAll(events);
    user.markEventsAsCommitted();
  }
}