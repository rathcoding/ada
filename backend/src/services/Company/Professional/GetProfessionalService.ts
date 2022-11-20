import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";
import { Professional } from "../../../entities/Professional";

export class GetProfessionalService {
  async execute(id) {
    
    const professionalRepo = AppDataSource.getRepository(Professional);
    let proDB = await professionalRepo.findOne({where: {id},
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true
      }
    });

    let professional = {...proDB}
    
    const professionalSkillRepo = AppDataSource.getRepository(ProfessionalSkill);
    const skillList = await professionalSkillRepo.find({where: {professional_id: id}, relations:["level", "skill"]});
    
    delete professional.skills
    professional['skills'] = [];

    for (const item of skillList) {
      professional.skills.push({
        id: item.skill.id,
        description: item.skill.description,
        level: item.level.description,
        experience: item.experience,
      })
    }

    return professional;
    
  };
}