import { AppDataSource } from "../../../../database/dataSource";
import { JobSkill } from "../../../../entities/JobSkill";

export class GetJobSkillsService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(JobSkill);

    return await repo.find({where: {job_id: id}, relations:["level", "skill"]})
  }
}

