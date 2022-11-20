import { AppDataSource } from "../../../database/dataSource";
import { Application } from "../../../entities/Application";
import { Stage } from "../../../entities/Stage";

export class DeleteProfessionalApplicationService {
  async execute({id, professional_id}) {
    const repo = AppDataSource.getRepository(Application);

    if(!await repo.findOne({where: {id, professional_id}})){
        return new Error("Professional skill does not exists!");
    }

    await repo.delete(id);
  }


}