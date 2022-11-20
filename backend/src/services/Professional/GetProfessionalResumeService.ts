import { AppDataSource } from "../../database/dataSource";
import { ProfessionalSkill } from "../../entities/ProfessionalSkill";

export class GetProfessionalResumeService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(ProfessionalSkill);

    return await repo.find({where: {professional_id: id}, relations:["level", "skill"]})
  }
}
