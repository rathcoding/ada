import { AppDataSource } from "../../database/dataSource";
import { Skill } from "../../entities/Skill";

interface SkillRequest {
  type: string;
  description: string;
}

export class CreateSkillService {
  
  async execute({type, description}:SkillRequest): Promise<Skill | Error> {
    const repo = AppDataSource.getRepository(Skill);

    if(await repo.findOne({where: {description}})){
        return new Error("Skill already exists");
    }

    const skill = repo.create({
      type,
      description
    })

    await repo.save(skill);

    return skill;
  }
}
