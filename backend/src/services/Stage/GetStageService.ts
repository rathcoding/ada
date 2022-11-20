
import { AppDataSource } from "../../database/dataSource";
import { Stage } from "../../entities/Stage";

export class GetStageService {
  
  async execute() {
    const repo = AppDataSource.getRepository(Stage);

    const stages = await repo.find();
    return stages;
  }
}
