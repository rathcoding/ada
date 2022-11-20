
import { AppDataSource } from "../../../database/dataSource";
import { Job } from "../../../entities/Job";
import { JobSkill } from "../../../entities/JobSkill";

export class DeleteJobService {
  
  async execute(id: number): Promise<Job | Error> {
    const repo = AppDataSource.getRepository(Job);

    if(!await repo.findOne({where: {id}})){
        return new Error("Job does not exists!");
    }

    const job = await repo.findOne({where: {id}})

    // REMOVER REGISTROS DA TABELA 'job_skill'
    const jobSkillsRepo = AppDataSource.getRepository(JobSkill);
    const jobSkills = await jobSkillsRepo.find({where: {job_id: id}});
    
    if (jobSkills) {  
      jobSkills.forEach((jskill) => {
        jobSkillsRepo.delete(jskill.id);
      });
    }
    // ATUALIZAR APPLICATIONS: job_id = null, stage = 'Vaga excluída'

    await repo.delete(id);
  }
}
