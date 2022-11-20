import { AppDataSource } from "../../database/dataSource";
import { Company } from "../../entities/Company";
const bcrypt = require('bcrypt');

export class CreateCompanyService {
  
  async execute(company: Company) {

    let newCompany = company
    newCompany.password = bcrypt.hashSync(company.password, 10);

    const repo = AppDataSource.getRepository(Company);

    const result = await repo.save(company)

    return result;
  }
}
