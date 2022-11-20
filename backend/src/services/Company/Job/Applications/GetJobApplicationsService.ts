import { AppDataSource } from "../../../../database/dataSource";
import { Application } from "../../../../entities/Application";

export class GetJobApplicationsService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Application);

    return await repo.find({where: {job_id: id}, relations:["professional", "stage"]})
  }
}

