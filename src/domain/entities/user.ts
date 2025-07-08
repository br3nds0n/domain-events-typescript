import { AggregateRoot } from '../../core/aggregate-root';
import { UserRegisteredEvent, UserEmailChangedEvent } from '../events/user-events';
import { generateId } from '../../shared/utils';

export class User extends AggregateRoot {
  private constructor(
    public readonly id: string,
    private _email: string,
    private _name: string,
    private _createdAt: Date
  ) {
    super();
  }

  static create(email: string, name: string): User {
    const userId = generateId();
    const user = new User(userId, email, name, new Date());
    
    user.addDomainEvent(new UserRegisteredEvent(userId, email, name));
    user.incrementVersion();
    
    return user;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  changeEmail(newEmail: string): void {
    if (newEmail === this._email) return;

    const oldEmail = this._email;
    this._email = newEmail;

    this.addDomainEvent(new UserEmailChangedEvent(this.id, oldEmail, newEmail));
    this.incrementVersion();
  }

  changeName(newName: string): void {
    this._name = newName;
    this.incrementVersion();
  }
}