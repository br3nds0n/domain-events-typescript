import { ECommerceSystem } from './infrastructure/bootstrap';
import { OrderItem } from './domain/entities/order';
import { delay, formatCurrency } from './shared/utils';

async function demonstrateECommerce() {
  console.log('🚀 Starting E-commerce Domain Events Demo\n');

  const system = new ECommerceSystem();
  const userService = system.getUserService();
  const orderService = system.getOrderService();

  try {
    console.log('📝 === REGISTERING USER ===');
    const userId = await userService.registerUser('maria@exemplo.com', 'Maria Silva');
    console.log(`User registered with ID: ${userId}\n`);

    await delay(500);

    console.log('🛒 === CREATING ORDER ===');
    const orderItems: OrderItem[] = [
      {
        productId: 'product-1',
        productName: 'Smartphone XYZ',
        quantity: 1,
        unitPrice: 899.99
      },
      {
        productId: 'product-2',
        productName: 'Fone Bluetooth',
        quantity: 2,
        unitPrice: 129.99
      }
    ];

    const orderId = await orderService.createOrder(userId, orderItems);
    console.log(`Order created with ID: ${orderId}`);
    
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    console.log(`Total amount: ${formatCurrency(totalAmount)}\n`);

    await delay(500);

    console.log('💳 === PROCESSING PAYMENT ===');
    await orderService.processPayment(orderId, 'payment-12345', 'credit_card');
    console.log('Payment processed\n');

    await delay(500);

    console.log('📦 === SHIPPING ORDER ===');
    await orderService.shipOrder(orderId, 'BR123456789', 'express');
    console.log('Order shipped\n');

    await delay(500);

    console.log('📊 === EVENT STATISTICS ===');
    const stats = system.getEventStatistics();
    stats.forEach(stat => {
      console.log(`${stat.eventType}: ${stat.subscribersCount} handlers`);
    });

    console.log('\n📜 === EVENT HISTORY ===');
    const eventHistory = system.getEventBus().getEventHistory();
    eventHistory.forEach((event, index) => {
      console.log(`${index + 1}. ${event.eventType} - ${event.occurredOn.toISOString()}`);
    });

    console.log('\n✅ E-commerce flow completed successfully!');

  } catch (error) {
    console.error('❌ Error in e-commerce flow:', error);
  }
}

demonstrateECommerce();