import { AppDataSource } from "../../../database/dataSource";
import { Job } from "../../../entities/Job";

export class UpdateJobService {
  
  async execute(job: Job) {

    const repo = AppDataSource.getRepository(Job);

    const result = await repo.save(job)

    return result;
  }
}
