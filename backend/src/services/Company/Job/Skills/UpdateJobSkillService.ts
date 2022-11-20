import { AppDataSource } from "../../../../database/dataSource";
import { JobSkill } from "../../../../entities/JobSkill";

interface JobSkillRequest {
  id: number,
  experience: number,
  level_id: number,
  skill_id: number,
  job_id: number
}

export class UpdateJobSkillService {
  
  async execute({id, experience, level_id, skill_id, job_id}:JobSkillRequest): Promise<JobSkill | Error> {
    const repo = AppDataSource.getRepository(JobSkill);

    const jobSkill = await repo.findOne({where: {id}});

    if(!jobSkill){
      return new Error("Job skill does not exists!");
    }
    
    const newJobSkill = await repo.save({...jobSkill, experience, level_id, skill_id, job_id});

    return newJobSkill;
  }
}