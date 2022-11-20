import { In } from "typeorm";
import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";
import { Professional } from "../../../entities/Professional";

export class GetProfessionalsService {
  async execute(skillIdList: [number]) {
    
    const professionalSkillRepo = AppDataSource.getRepository(ProfessionalSkill);
    const skillProfessionalList = await professionalSkillRepo.find({where: {skill_id: In(skillIdList)}, relations:["level", "skill"]});

    const professionalIdList = skillProfessionalList.map((item) => item.professional_id);
    const professionalRepo = AppDataSource.getRepository(Professional);
    let professionals:any[] = await professionalRepo.find({
      where: {id: In(professionalIdList)},
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true
      }
    });

    const repo3 = AppDataSource.getRepository(ProfessionalSkill);

    let result = [];

    for (let professional of professionals) {
      let skills = await repo3.find({ where: {professional_id: professional.id}, relations:["level", "skill"] });
      
      professional['skills'] = [];

      for (const item of skills) {
        professional.skills.push(
          {
            id: item.skill.id,
            description: item.skill.description,
            level: item.level.description,
            experience: item.experience
          }
        )
      }
      
      result.push(professional)
    };

    return result;
    
  }
}