import { Request, Response } from "express";
import { GetLevelService } from "../services/Level/GetLevelService";

export class LevelController {
  async handleGetAll(request: Request, response: Response) {

    const service = new GetLevelService();

    const levels = await service.execute();
    
    return response.json(levels);
  }

}