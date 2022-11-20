
import { AppDataSource } from "../../../database/dataSource";
import { Company } from "../../../entities/Company";

export class GetCompanyProfileService {
  
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Company);

    const company = await repo.findOne({where: {id}});
    return company;
  }
}
