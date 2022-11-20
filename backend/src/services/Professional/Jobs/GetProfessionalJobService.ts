import { AppDataSource } from "../../../database/dataSource";
import { ProfessionalSkill } from "../../../entities/ProfessionalSkill";

interface QueryReturnType {
  cnpj: string;
  company_id: number;
  created_at: string;
  description: string;
  dt_end: string;
  dt_start: string;
  email: string;
  experience: number;
  id: number;
  job_id: number;
  level_id: number;
  match_min: number;
  name: string;
  password: string;
  salary_max: number;
  salary_min: number;
  skill_id: number;
  title: string;
  type: string;
  level: string;
  skill: string;
}

export class GetProfessionalsJobService {
  async execute({skillIdList, id}) {

    if (!skillIdList.length){
      return {job: [], skillsPro: []};
    }
    
    const query: QueryReturnType[] = await AppDataSource.manager.query(`
      SELECT l.description as level, s.description as skill, j.id as jobId, * FROM job j 
        LEFT JOIN company c 
          ON j.company_id  = c.id 
        LEFT JOIN job_skill js 
          ON js.job_id = j.id 
        LEFT JOIN skill s 
          ON js.skill_id  = s.id 
        LEFT JOIN level l 
          ON js.level_id  = l.id where job_id in 
            (SELECT job_id FROM job_skill js 
              LEFT JOIN job j 
                ON js.job_id  = j.id 
              LEFT JOIN skill s 
                ON js.skill_id  = s.id 
              LEFT JOIN level l 
                ON js.level_id  = l.id 
              where skill_id in (${skillIdList})
            )
    `);

    // como tem q ser array de objetos do skill [ { id: 1, level: "Sênior", experience: 3.5 } ]
    const newValues = query.reduce((acc: any[], val: QueryReturnType, i:number) => {
      const index = acc.findIndex(value => value.id == val.job_id);
      
      if( index < 0){
        acc.push({
          id: val.job_id,
          companyName: val.name,
          jobTitle: val.title,
          salaryMin: val.salary_min,
          salaryMax: val.salary_max,
          matchMin: val.match_min,
          skills: [{
            id: val.skill_id,
            skill: val.skill,
            experience: val.experience,
            level_id: val.level_id,
            level: val.level,
          }],
  
        });
        return acc;
      }

      acc[index].skills.push({
        id: val.skill_id,
        skill: val.skill,
        experience: val.experience,
        level_id: val.level_id,
        level: val.level,
      })

      return acc;
    }, [] as any[]);

    const professionalSkillRepo = AppDataSource.getRepository(ProfessionalSkill);

    const skillsProfessional = await professionalSkillRepo.find({where: {professional_id: id}, relations:["level", "skill"]})

    const newSkills = skillsProfessional.reduce((acc: any[], val: any, i:number) => {
        acc.push({
            id: val.skill_id,
            experience: val.experience,
            level_id: val.level_id,
            level: val.level.description,
      });

      return acc;
    }, [] as any[]);

    return {job: newValues, skillsPro: newSkills};
    
  }
}