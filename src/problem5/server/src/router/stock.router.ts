import { Router, Request, Response } from "express";

export const stockRouter = Router();

import { StockService } from "../service/stock.service";
import { UpdateStockDto } from "../dto/update-stock.dto"

const stockService = new StockService();

stockRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const stocks = await stockService.getAllStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
});

stockRouter.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const stock = await stockService.getStockById(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock" });
  }
});

stockRouter.post("/", async (req: Request, res: Response) => {
  try {
    const stock = await stockService.createStock(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: "Failed to create stock" });
  }
});

stockRouter.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const updateStockDto: UpdateStockDto = req.body;
    const stock = await stockService.updateStock(req.params.id, updateStockDto);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
});

stockRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const success = await stockService.deleteStock(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Stock not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete stock" });
    }
  },
);

// Ideally done by cron job
stockRouter.post("/update-prices", async (_req: Request, res: Response) => {
  try {
    await stockService.updateAllPrices();
    res.status(200).json({ message: "Stock prices updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock prices" });
  }
});
