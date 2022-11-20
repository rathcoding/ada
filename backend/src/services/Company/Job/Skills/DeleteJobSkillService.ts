
import { AppDataSource } from "../../../../database/dataSource";
import { JobSkill } from "../../../../entities/JobSkill";

export class DeleteJobSkillService {
  
  async execute(id: number): Promise<JobSkill | Error> {
    const repo = AppDataSource.getRepository(JobSkill);

    if(!await repo.findOne({where: {id}})){
        return new Error("Job Skill does not exists!");
    }

    await repo.delete(id);
  }
}
