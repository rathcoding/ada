import { AppDataSource } from "../../../database/dataSource";
import { Job } from "../../../entities/Job";

export class GetJobService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Job);

    return await repo.findOne({where: {id}})
  }
}
