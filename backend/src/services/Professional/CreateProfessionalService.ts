import { AppDataSource } from "../../database/dataSource";
import { Professional } from "../../entities/Professional";
const bcrypt = require('bcrypt');

export class CreateProfessionalService {
  
  async execute(professional: Professional) {

    let newProfessional = professional
    newProfessional.password = bcrypt.hashSync(professional.password, 10);

    const repo = AppDataSource.getRepository(Professional);

    const result = await repo.save(newProfessional)

    return result;
  }
}
