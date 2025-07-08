import { InventoryService } from '../services/inventory.service';

export class ReserveInventoryUseCase {
  constructor(private inventoryService: InventoryService) {}

  async execute(productId: string, quantity: number): Promise<void> {
    await this.inventoryService.reserveStock(productId, quantity);
  }
}