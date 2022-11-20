
import { AppDataSource } from "../../database/dataSource";
import { Company } from "../../entities/Company";

export class GetByEmailCompanyService {
  
  async execute(email: string) {
    const repo = AppDataSource.getRepository(Company);

    const company = await repo.findOne({where: {email}});
    return company;
  }
}
