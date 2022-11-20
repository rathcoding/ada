import { Request, Response } from "express";
import { CompanyLoginService } from "../services/Login/CompanyLoginService";

export class CompanyLoginController {
  async handleLogin(request: Request, response: Response) {
    const {email, password } = request.body;

    const service = new CompanyLoginService();

    const result = await service.execute({email, password});

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    const token = service.generateToken(result, 300);

    const refreshToken = service.generateRefreshToken(result);

    return response.json({token, refreshToken, ...result});
  };

};