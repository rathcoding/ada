
import { AppDataSource } from "../../../database/dataSource";
import { Professional } from "../../../entities/Professional";

export class GetProfessionalProfile {
  
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Professional);

    const professional = await repo.findOne({where: {id}});
    return professional;
  }
}
