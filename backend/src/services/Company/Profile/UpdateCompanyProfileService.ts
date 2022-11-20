import { AppDataSource } from "../../../database/dataSource";
import { Company } from "../../../entities/Company";

export class UpdateCompanyProfileService {
  
  async execute(company: Company) {

    const repo = AppDataSource.getRepository(Company);

    const result = await repo.save(company)

    return result;
  }
}
