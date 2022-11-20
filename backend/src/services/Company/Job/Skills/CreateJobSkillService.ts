import { AppDataSource } from "../../../../database/dataSource";
import { JobSkill } from "../../../../entities/JobSkill";

interface JobSkillRequest {
  experience: number,
  level_id: number,
  skill_id: number,
  job_id: number,
}

export class CreateJobSkillService {
  
  async execute(jobSkill:JobSkillRequest): Promise<JobSkill | Error> {
    const repo = AppDataSource.getRepository(JobSkill);

    if(await repo.findOne({where: {job_id: jobSkill.job_id, skill_id: jobSkill.skill_id}})){
      return new Error("Skill já cadastrada!");
  }

    const jobSkillCreated = repo.create(jobSkill)
    await repo.save(jobSkill);
    
    return repo.findOne({where: {id: jobSkillCreated.id, skill_id: jobSkillCreated.skill_id}, relations:["level", "skill"]})
    
  }
}