import { Repository } from 'typeorm';
import { appDataSource } from '../datasource';
import { Stock } from '../entity/stock.entity';

export class StockRepository {
  private repository: Repository<Stock>;

  constructor() {
    this.repository = appDataSource.getRepository(Stock);
  }

  async create(stock: Partial<Stock>): Promise<Stock> {
    const newStock = this.repository.create(stock);
    return await this.repository.save(newStock);
  }

  async findAll(): Promise<Stock[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Stock | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByTicker(ticker: string): Promise<Stock | null> {
    return await this.repository.findOneBy({ ticker });
  }

  async update(id: string, stock: Partial<Stock>): Promise<Stock | null> {
    await this.repository.update(id, stock);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
