
import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";

export class DeleteProfessionalSkillService {
  
  async execute(id: number): Promise<ProfessionalSkill | Error> {
    const repo = AppDataSource.getRepository(ProfessionalSkill);

    if(!await repo.findOne({where: {id}})){
        return new Error("Professional skill does not exists!");
    }

    await repo.delete(id);
  }
}
