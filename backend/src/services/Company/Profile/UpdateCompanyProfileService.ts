import { AppDataSource } from "../../../database/dataSource";
import { Company } from "../../../entities/Company";
const bcrypt = require('bcrypt');

export class UpdateCompanyProfileService {
  
  async execute(company: Company) {

    const repo = AppDataSource.getRepository(Company);

    if (company.password) {
      company.password = bcrypt.hashSync(company.password, 10);
    }
    const result = await repo.save(company)

    return result;
  }
}
