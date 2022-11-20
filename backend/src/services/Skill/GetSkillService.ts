
import { AppDataSource } from "../../database/dataSource";
import { Skill } from "../../entities/Skill";

export class GetSkillService {
  
  async execute() {
    const repo = AppDataSource.getRepository(Skill);

    const skill = await repo.find();
    return skill;
  }
}
