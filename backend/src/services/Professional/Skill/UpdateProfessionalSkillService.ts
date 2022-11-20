import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";

interface ProfessionalSkillRequest {
  id: number 
  experience: number,
  level_id: number,
  skill_id: number,
  professional_id,
}

export class UpdateProfessionalSkillService {
  
  async execute({id, experience, level_id, skill_id, professional_id}:ProfessionalSkillRequest): Promise<ProfessionalSkill | Error> {
    const repo = AppDataSource.getRepository(ProfessionalSkill);

    const professionalSkill = await repo.findOne({where: {id}});

    if(!professionalSkill){
      return new Error("Professional skill does not exists!");
    }
    
    const newProfessionalSkill = await repo.save({...professionalSkill, experience, level_id, skill_id, professional_id});

    return newProfessionalSkill;
  }
}