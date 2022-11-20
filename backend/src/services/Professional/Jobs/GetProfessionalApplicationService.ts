import { AppDataSource } from "../../../database/dataSource";
import { Application } from "../../../entities/Application";
import { Stage } from "../../../entities/Stage";

export class GetProfessionalApplicationService {
  async execute(id: number) {
    const stageRepo = AppDataSource.getRepository(Stage);

    const data = await AppDataSource.manager.query(`
    SELECT c."name" as company_name, j.title as job_title, j.salary_min as salary_min, j.salary_max as salary_max, 
      a."match" as match, a.id as id, a.feedback as feedback, s.description  as stage_description, s.id  as stage_id FROM application a 
      LEFT JOIN job j 
        ON a.job_id = j.id 
      LEFT JOIN  stage s
        ON a.stage_id = s.id
      LEFT JOIN company c  
        ON j.company_id = c.id
        WHERE professional_id = ${id}
    `);

    const stages = await stageRepo.find();

    const newStages = stages.map(stage=> ({value: stage.id,
      label: stage.description}));

    return { data: data, stages: newStages}
  }


}