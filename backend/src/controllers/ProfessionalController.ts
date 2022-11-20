import { Request, Response } from "express";
import { CreateProfessionalService } from "../services/Professional/CreateProfessionalService";
import { GetByEmailProfessionalService } from "../services/Professional/GetByEmailProfessionalService";
import { GetProfessionalProfile } from "../services/Professional/Profile/GetProfessionalProfileService";
import { UpdateProfessionalProfile } from "../services/Professional/Profile/UpdateProfessionalProfileService";
import { CreateProfessionalSkillService } from "../services/Professional/Skill/CreateProfessionalSkillService";
import { UpdateProfessionalSkillService } from "../services/Professional/Skill/UpdateProfessionalSkillService";
import { DeleteProfessionalSkillService } from "../services/Professional/Skill/DeleteProfessionalSkillService";
import { GetProfessionalResumeService } from "../services/Professional/GetProfessionalResumeService";
import { GetProfessionalsJobService } from "../services/Professional/Jobs/GetProfessionalJobService";
import { CreateApplicationService } from "../services/Professional/Jobs/CreateApplicationService";
import { GetProfessionalJobMatchService } from "../services/Professional/Jobs/GetProfessionalJobMatchService";
import { GetProfessionalApplicationService } from "../services/Professional/Jobs/GetProfessionalApplicationService";
import jwt from 'jsonwebtoken';
import { DeleteProfessionalApplicationService } from "../services/Professional/Jobs/DeleteProfessionalApplicationService";

export class ProfessionalController {

  async handleCreate(request: Request, response: Response) {

    let professional = request.body
    professional['last_name'] = "";
    professional['birth_date'] = ""

    const getByEmailProfessionalService = new GetByEmailProfessionalService();
    const res = await getByEmailProfessionalService.execute(professional.email);
    if (res) {
      return response.status(409).send("Email já cadastrado.");
    }
    
    const service = new CreateProfessionalService();
    const result = await service.execute(professional);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);

  };

  async handleGetProfile(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    const service = new GetProfessionalProfile();
    
    const result = await service.execute(tokenDecode['user'].id);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    delete result.password;

    return response.json(result);

  };

  async handleUpdateProfile(request: Request, response: Response) {
    const professional = request.body
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);

    professional["id"] = tokenDecode['user'].id;

    const service = new UpdateProfessionalProfile();

    const result = await service.execute(professional);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleCreateSkill(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    const professionalSkill = request.body

    professionalSkill["professional_id"] = tokenDecode['user'].id;

    const service = new CreateProfessionalSkillService();

    const result = await service.execute(professionalSkill);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);

  };

  async handleUpdateSkill(request: Request, response: Response) {
    const { level_id, skill_id, experience } = request.body
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);

    const professional_id = tokenDecode['user'].id;
    const id = parseInt(request.params.id, 10)

    const service = new UpdateProfessionalSkillService();

    const result = await service.execute({id, level_id, skill_id, experience, professional_id });

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleDeleteSkill(request: Request, response: Response) {

    const { id } = request.params;

    const service = new DeleteProfessionalSkillService();

    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json({message: 'Removido com sucesso!'});
  }

  async handleGetResume(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    const service = new GetProfessionalResumeService();
    
    const result = await service.execute(tokenDecode['user'].id);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleGetJobs(request: Request, response: Response) {
    const { skillIdList } = request.body;
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);

    const service = new GetProfessionalsJobService();
    
    const result = await service.execute({skillIdList: skillIdList, id: tokenDecode['user'].id});

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  };

  async handleCreateApplication(request: Request, response: Response) {
    const { data } = request.body;
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    data['professional_id'] = tokenDecode['user'].id;

    const service = new CreateApplicationService();
    
    const result = await service.execute(data);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  };

  async handleGetJobsMatch(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
  
    const service = new GetProfessionalJobMatchService();
    
    const result = await service.execute(tokenDecode['user'].id);
  
    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }
  
    return response.json(result);
  };

  async handleGetApplication(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
  
    const service = new GetProfessionalApplicationService();
    
    const result = await service.execute(tokenDecode['user'].id);
  
    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }
  
    return response.json(result);
  };
  
  async handleDeleteApplication(request: Request, response: Response) {
    const { id } = request.params;
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
  
    const service = new DeleteProfessionalApplicationService();
    
    const result = await service.execute({ id: id, professional_id: tokenDecode['user'].id});
  
    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }
  
    return response.json(result);
  };
  
};