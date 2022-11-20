import { AppDataSource } from "../../../database/dataSource";
import { Application } from "../../../entities/Application";
import { Stage } from "../../../entities/Stage";


interface ApplicationRequest {
  professional_id: number;
  match: number;
  job_id: number;
}

export class CreateApplicationService {
  
  async execute(data:ApplicationRequest): Promise<Application | Error> {
    const applicationRepo = AppDataSource.getRepository(Application);
    const stageRepo = AppDataSource.getRepository(Stage);

    if(await applicationRepo.findOne({where: {job_id: data.job_id, professional_id: data.professional_id}})){
        return new Error("Já cadastrada");
    }

    const stage = await stageRepo.findOne({where:{description: 'Inscrita'}})

    data['stage_id'] = stage.id;
    data['feedback'] = '';

    const application = applicationRepo.create(data);

    await applicationRepo.save(application);

    return application;
  }
}
