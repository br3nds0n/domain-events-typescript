export class InventoryService {
  async reserveStock(productId: string, quantity: number): Promise<void> {
    console.log(`📦 Reserving ${quantity} units of product ${productId}`);
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`✅ Stock reserved for product ${productId}`);
  }
}