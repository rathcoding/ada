import { Request, Response } from "express";
import { CreateCompanyService } from "../services/Company/CreateCompanyService";
import { GetByEmailCompanyService } from "../services/Company/GetByEmailCompanyService";

import { GetCompanyProfileService } from "../services/Company/Profile/GetCompanyProfileService";
import { UpdateCompanyProfileService } from "../services/Company/Profile/UpdateCompanyProfileService";

import { GetCompanyJobsService } from "../services/Company/Job/GetCompanyJobsService";
import { DeleteJobService } from "../services/Company/Job/DeleteJobService";
import { GetJobService } from "../services/Company/Job/GetJobService";
import { CreateJobService } from "../services/Company/Job/CreateJobService";
import { UpdateJobService } from "../services/Company/Job/UpdateJobService";

import { CreateJobSkillService } from "../services/Company/Job/Skills/CreateJobSkillService";
import { UpdateJobSkillService } from "../services/Company/Job/Skills/UpdateJobSkillService";
import { DeleteJobSkillService } from "../services/Company/Job/Skills/DeleteJobSkillService";
import { GetJobSkillsService } from "../services/Company/Job/Skills/GetJobSkillsService";

import { GetJobApplicationsService } from "../services/Company/Job/Applications/GetJobApplicationsService";
import { GetApplicationService } from '../services/Company/Job/Applications/GetApplicationService';
import { UpdateApplicationService } from '../services/Company/Job/Applications/UpdateApplicationService';

import { GetProfessionalService } from "../services/Company/Professional/GetProfessionalService";
import { GetProfessionalsService } from "../services/Company/Professional/GetProfessionalsService";

import jwt from 'jsonwebtoken';

export class CompanyController {

  // ======================================================================
  // Handlers da Company
  // ======================================================================

  async handleCreate(request: Request, response: Response) {

    const company = request.body
    company["description"] = "";

    const getByEmailCompanyService = new GetByEmailCompanyService();
    const res = await getByEmailCompanyService.execute(company.email);
    if (res) {
      return response.status(409).send("Email já cadastrado.");
    }
    
    const service = new CreateCompanyService();
    const result = await service.execute(company);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);

  };


  async handleGetOne(request: Request, response: Response) {

    const { authorization } = request.headers;

    const tokenDecode = jwt.decode(authorization)
    
    const service = new GetCompanyProfileService();
    
    const result = await service.execute(tokenDecode['user'].id);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    delete result.password;

    return response.status(200).json(result);

  };


  async handleUpdate(request: Request, response: Response) {

    const company = request.body
    
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization)
    company["id"] = tokenDecode['user'].id
    
    const service = new UpdateCompanyProfileService();

    const result = await service.execute(company);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  // ======================================================================
  // Handlers de Jobs Publicados pela Company
  // ======================================================================

  async handleGetJobs(request: Request, response: Response) {
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    const service = new GetCompanyJobsService();
    
    const result = await service.execute(tokenDecode['user'].id);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleDeleteJob(request: Request, response: Response) {

    const { id } = request.params;

    const service = new DeleteJobService();

    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json({message: 'Removido com sucesso!'});
  };

  async handleGetJob(request: Request, response: Response) {
    
    const { id } = request.params;
    
    const service = new GetJobService();
    
    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleCreateJob(request: Request, response: Response) {

    const job = request.body
    
    const { authorization } = request.headers;
    const tokenDecode = jwt.decode(authorization);
    job["company_id"] = tokenDecode['user'].id;
    
    const service = new CreateJobService();
    const result = await service.execute(job);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);

  };

  async handleUpdateJob(request: Request, response: Response) {
    
    const job = request.body

    const service = new UpdateJobService();

    const result = await service.execute(job);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  // ======================================================================
  // Handlers de Job Skills...
  // ======================================================================

  async handleCreateSkill(request: Request, response: Response) {
    const jobSkill = request.body

    const service = new CreateJobSkillService();

    const result = await service.execute(jobSkill);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);

  };

  async handleUpdateSkill(request: Request, response: Response) {
    
    const jobSkill = request.body

    const service = new UpdateJobSkillService();

    const result = await service.execute(jobSkill);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleDeleteSkill(request: Request, response: Response) {

    const { id } = request.params;

    const service = new DeleteJobSkillService();

    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json({message: 'Removido com sucesso!'});
  }

  async handleGetJobSkills(request: Request, response: Response) {
    
    const { id } = request.params;
    const service = new GetJobSkillsService();
    
    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  // ======================================================================
  // Handlers de Applications
  // ======================================================================

  async handleGetJobApplications(request: Request, response: Response) {
    
    const { id } = request.params;
    const service = new GetJobApplicationsService();
    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    let applications = []

    for (let application of result) {
      delete application.professional.password
      applications.push(application)
    }
    

    return response.json(applications);

  };

  async handleGetJobApplication(request: Request, response: Response) {
    
    const { id } = request.params;
    const service = new GetApplicationService();
    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };
  
  async handleUpdateJobApplication(request: Request, response: Response) {
    
    const application = request.body

    const service = new UpdateApplicationService();

    const result = await service.execute(application);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  // ======================================================================
  // Handlers para busca de Professionals
  // ======================================================================

  async handleGetProfessionals(request: Request, response: Response) {
    
    const { skillIdList } = request.body;

    const service = new GetProfessionalsService();
    
    const result = await service.execute(skillIdList);

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

  async handleGetProfessional(request: Request, response: Response) {
    
    const { id } = request.params;

    const service = new GetProfessionalService();
    
    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);

  };

};