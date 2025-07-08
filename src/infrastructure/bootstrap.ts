import { DomainEventBus } from '../core/domain-event-bus';
import { UserApplicationService } from '../application/services/user.service';
import { OrderApplicationService } from '../application/services/order.service';
import { EmailService } from '../application/services/email.service';
import { InventoryService } from '../application/services/inventory.service';
import { InvoiceService } from '../application/services/invoice.service';
import { InMemoryUserRepository } from './repositories/user.repository';
import { InMemoryOrderRepository } from './repositories/order.repository';

import { SendWelcomeEmailHandler, CreateUserProfileHandler } from '../application/handlers/user-handlers';
import { ReserveInventoryHandler, SendOrderConfirmationHandler, GenerateInvoiceHandler, TrackShippedOrderHandler } from '../application/handlers/order-handlers';

import { SendWelcomeEmailUseCase, SendOrderConfirmationUseCase } from '../application/use-cases/email-use-cases';
import { ReserveInventoryUseCase } from '../application/use-cases/inventory-use-cases';
import { GenerateInvoiceUseCase } from '../application/use-cases/invoice-use-cases';
import { CreateUserProfileUseCase } from '../application/use-cases/user-use-cases';

export class ECommerceSystem {
  private eventBus: DomainEventBus;
  private userService!: UserApplicationService;
  private orderService!: OrderApplicationService;

  constructor() {
    this.eventBus = new DomainEventBus();
    this.setupEventHandlers();
    this.setupServices();
  }

  private setupEventHandlers(): void {
    const emailService = new EmailService();
    const inventoryService = new InventoryService();
    const invoiceService = new InvoiceService();

    const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(emailService);
    const sendOrderConfirmationUseCase = new SendOrderConfirmationUseCase(emailService);
    const reserveInventoryUseCase = new ReserveInventoryUseCase(inventoryService);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceService);
    const createUserProfileUseCase = new CreateUserProfileUseCase();

    this.eventBus.subscribe('UserRegistered', new SendWelcomeEmailHandler(sendWelcomeEmailUseCase));
    this.eventBus.subscribe('UserRegistered', new CreateUserProfileHandler(createUserProfileUseCase));

    this.eventBus.subscribe('OrderPlaced', new ReserveInventoryHandler(reserveInventoryUseCase));
    this.eventBus.subscribe('OrderPlaced', new SendOrderConfirmationHandler(sendOrderConfirmationUseCase));
    this.eventBus.subscribe('OrderPaid', new GenerateInvoiceHandler(generateInvoiceUseCase));
    this.eventBus.subscribe('OrderShipped', new TrackShippedOrderHandler());

    console.log('✅ All domain event handlers configured');
  }

  private setupServices(): void {
    const userRepository = new InMemoryUserRepository();
    const orderRepository = new InMemoryOrderRepository();

    this.userService = new UserApplicationService(this.eventBus, userRepository);
    this.orderService = new OrderApplicationService(this.eventBus, orderRepository);

    console.log('✅ Application services configured');
  }

  getUserService(): UserApplicationService {
    return this.userService;
  }

  getOrderService(): OrderApplicationService {
    return this.orderService;
  }

  getEventBus(): DomainEventBus {
    return this.eventBus;
  }

  getEventStatistics(): { eventType: string; subscribersCount: number }[] {
    const eventTypes = ['UserRegistered', 'UserEmailChanged', 'OrderPlaced', 'OrderPaid', 'OrderShipped'];
    
    return eventTypes.map(eventType => ({
      eventType,
      subscribersCount: this.eventBus.getSubscribersCount(eventType)
    }));
  }
}