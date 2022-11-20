import { Request, Response } from "express";
import { GetStageService } from "../services/Stage/GetStageService";

export class StageController {
  async handleGetAll(request: Request, response: Response) {

    const service = new GetStageService();

    const stages = await service.execute();
    
    return response.status(200).json(stages);
  }

}