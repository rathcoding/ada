import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";


interface ProfessionalSkillRequest {
  experience: number,
  level_id: number,
  skill_id: number,
  professional_id: number,
}

export class CreateProfessionalSkillService {
  
  async execute(professionalSkill:ProfessionalSkillRequest): Promise<ProfessionalSkill | Error> {
    const repo = AppDataSource.getRepository(ProfessionalSkill);

    if(await repo.findOne({where: {professional_id: professionalSkill.professional_id, skill_id: professionalSkill.skill_id}})){
      return new Error("Skill já cadastrada!");
  }

    const professionalSkillCreated = repo.create(professionalSkill)
    await repo.save(professionalSkill);
    
    return repo.findOne({where: {id: professionalSkillCreated.id, skill_id: professionalSkillCreated.skill_id}, relations:["level", "skill"]})
    
  }
}