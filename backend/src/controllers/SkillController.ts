import { Request, Response } from "express";
import { GetSkillService } from "../services/Skill/GetSkillService";
import { CreateSkillService } from "../services/Skill/CreateSkillService";
import { DeleteSkillService } from "../services/Skill/DeleteSkillService";
import { UpdateSkillService } from "../services/Skill/UpdateSkillService";

export class SkillController {
  async handleCreate(request: Request, response: Response) {

    const {type, description } = request.body;

    const service = new CreateSkillService();

    const result = await service.execute({type, description});

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }

  async handleGetAll(request: Request, response: Response) {

    const service = new GetSkillService();

    const skills = await service.execute();
    
    return response.status(200).json(skills);
  }

  async handleDelete(request: Request, response: Response) {

    const { id } = request.params;

    const service = new DeleteSkillService();

    const result = await service.execute(parseInt(id, 10));

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).end();
  }

  async handlePut(request: Request, response: Response) {

    const id = parseInt(request.params.id, 10)
    const {type, description } = request.body;

    const service = new UpdateSkillService();
    const result = await service.execute({id, type, description});

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }
}