import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Company } from "./Company";
import { JobSkill } from "./JobSkill"
import { Application } from "./Application";

@Entity("job")
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type: 'text'})
  description: string;

  @Column("real")
  salary_min: number;

  @Column("real")
  salary_max: number;

  @Column()
  dt_start: string;

  @Column()
  dt_end: string;

  @Column("real")
  match_min: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({name: "company_id"})
  company: Company;

  @OneToMany(() => JobSkill, (jobskill) => jobskill.job_id, {cascade: true, onDelete:'CASCADE'})
  skills: JobSkill[];

  @OneToMany(() => Application, (application) => application.job_id)
  applications: Application[]
  
  @CreateDateColumn()
  created_at: Date;

}