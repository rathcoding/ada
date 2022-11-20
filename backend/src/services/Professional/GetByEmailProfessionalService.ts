
import { AppDataSource } from "../../database/dataSource";
import { Professional } from "../../entities/Professional";

export class GetByEmailProfessionalService {
  
  async execute(email: string) {

    const repo = AppDataSource.getRepository(Professional);

    const professional = await repo.findOne({where: {email}});

    return professional;
  }
}
