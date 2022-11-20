
import { AppDataSource } from "../../database/dataSource";
import { Professional } from "../../entities/Professional";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfessionalDTO {
  id: number;
  name: string;
  email: string;
}

export class LoginService {
  async execute({email, password}: LoginRequest): Promise<ProfessionalDTO | Error> {

    const repo = AppDataSource.getRepository(Professional);

    const professional = await repo.findOne({
      where: { email },
    });

    if (!professional) {
      return new Error("Email ou senha inválidos");
    }

    if (bcrypt.compareSync(password, professional.password)) {
      return {
        id: professional.id,
        email: professional.email,
        name: professional.name,
      };
    }

    return new Error("Email ou senha inválidos");

  }

  generateToken(professional:ProfessionalDTO, expiresIn: number) {
    return jwt.sign({user: professional}, process.env.ACCESS_TOKEN_SECRET, {expiresIn});
  }

  generateRefreshToken(professional:ProfessionalDTO) {
    return jwt.sign({user: professional}, process.env.REFRESH_TOKEN_SECRET);
  }

}
