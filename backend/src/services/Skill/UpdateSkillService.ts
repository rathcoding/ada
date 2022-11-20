
import { AppDataSource } from "../../database/dataSource";
import { Skill } from "../../entities/Skill";

interface SkillUpdateRequest {
  id: number
  type: string;
  description: string;
}

export class UpdateSkillService {
  
  async execute({id, type, description}:SkillUpdateRequest): Promise<Skill | Error> {
    const repo = AppDataSource.getRepository(Skill);

    const skill = await repo.findOne({where: {id}});
    
    if(!skill){
        return new Error("Skill does not exists!");
    }

    await repo.save({...skill, type, description});

    return skill;
  }
}
