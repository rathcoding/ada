import { Request, Response } from "express";
import { LoginService } from "../services/Login/LoginService";
import jwt from 'jsonwebtoken';

export class TokenController {
  async handleRefresh(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const tokenRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
      if(err){
        return response.status(500).json({message: "Erro no token!"})
      }
      const { user } = decode;
      
      const service = new LoginService();

      const token = service.generateToken(user, 300);
    
      return {token}
    });

    return response.json(tokenRefresh);
  };

};