import { AppDataSource } from "../../../../database/dataSource";
import { Application } from "../../../../entities/Application";

export class UpdateApplicationService {
  
  async execute(application: Application) {

    const repo = AppDataSource.getRepository(Application);

    const result = await repo.save(application)

    return result;
  }
}
