
import { AppDataSource } from "../../database/dataSource";
import { Company } from "../../entities/Company";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

interface LoginRequest {
  email: string;
  password: string;
}

export interface CompanyDTO {
  id: number;
  name: string;
  email: string;
}

export class CompanyLoginService {
  async execute({email, password}: LoginRequest): Promise<CompanyDTO | Error> {

    const repo = AppDataSource.getRepository(Company);

    const company = await repo.findOne({
      where: { email },
    });

    if (!company) {
      return new Error("Email ou senha inválidos");
    }

    if (bcrypt.compareSync(password, company.password)) {
      return {
        id: company.id,
        email: company.email,
        name: company.name,
      };
    }

    return new Error("Email ou senha inválidos");

  }

  generateToken(company:CompanyDTO, expiresIn: number) {
    return jwt.sign({user: company}, process.env.ACCESS_TOKEN_SECRET, {expiresIn});
  }

  generateRefreshToken(company:CompanyDTO) {
    return jwt.sign({user: company}, process.env.REFRESH_TOKEN_SECRET);
  }

}
