
import { AppDataSource } from "../../database/dataSource";
import { Skill } from "../../entities/Skill";

export class DeleteSkillService {
  
  async execute(id: number): Promise<Skill | Error> {
    const repo = AppDataSource.getRepository(Skill);

    if(!await repo.findOne({where: {id}})){
        return new Error("Skill does not exists!");
    }

    await repo.delete(id);
  }
}
