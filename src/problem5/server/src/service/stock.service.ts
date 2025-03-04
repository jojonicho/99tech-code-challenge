// create
// list
// get detail
// update
// delete 

import { Stock } from '../entity/stock.entity';
import { StockRepository } from '../repository/stock.repository';

export class StockService {
  private stockRepository: StockRepository;

  constructor() {
    this.stockRepository = new StockRepository();
  }

  async createStock(stockData: Partial<Stock>): Promise<Stock> {
    return await this.stockRepository.create(stockData);
  }

  async getAllStocks(): Promise<Stock[]> {
    return await this.stockRepository.findAll();
  }

  async getStockById(id: string): Promise<Stock | null> {
    return await this.stockRepository.findById(id);
  }

  async updateStock(id: string, stockData: Partial<Stock>): Promise<Stock | null> {
    return await this.stockRepository.update(id, stockData);
  }

  async deleteStock(id: string): Promise<boolean> {
    return await this.stockRepository.delete(id);
  }

  // Ideally done as a cron job
  async updateAllPrices(): Promise<void> {
    const stocks = await this.stockRepository.findAll();
    
    for (const stock of stocks) {
      // Substitute for API call with random price between $1-1000
      const newPrice = +(Math.random() * 999 + 1).toFixed(2);
      
      await this.stockRepository.update(stock.id, {
        currentPrice: newPrice
      });
    }
  }
}
