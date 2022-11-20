import { AppDataSource } from "../../../../database/dataSource";
import { Application } from "../../../../entities/Application";

export class GetApplicationService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Application);

    return await repo.findOne({where: {id}})
  }
}

