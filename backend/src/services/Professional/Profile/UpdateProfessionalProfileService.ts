import { AppDataSource } from "../../../database/dataSource";
import { Professional } from "../../../entities/Professional";

export class UpdateProfessionalProfile {
  
  async execute(professional: Professional) {

    const repo = AppDataSource.getRepository(Professional);

    const professionalExist = await repo.findOne({where: {id: professional.id}});
    
    if(!professionalExist){
      return new Error("Professional does not exists!");
    }

    const result = await repo.save(professional)

    return result;
  }
}
