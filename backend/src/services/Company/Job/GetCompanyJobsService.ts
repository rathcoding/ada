import { AppDataSource } from "../../../database/dataSource";
import { Job } from "../../../entities/Job";

export class GetCompanyJobsService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Job);

    return await repo.find({where: {company_id: id}})
  }
}
