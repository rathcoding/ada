
import { AppDataSource } from "../../database/dataSource";
import { Level } from "../../entities/Level";

export class GetLevelService {
  
  async execute() {
    const repo = AppDataSource.getRepository(Level);

    const levels = await repo.find();
    return levels;
  }
}
