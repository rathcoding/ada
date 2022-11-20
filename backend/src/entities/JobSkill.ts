import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Job } from "./Job";
import { Skill } from "./Skill";
import { Level } from "./Level";

@Entity("job_skill")
export class JobSkill {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  experience: number;
  
  @Column()
  level_id: number;

  @Column()
  skill_id: number;

  @Column()
  job_id: number;

  @ManyToOne(() => Level)
  @JoinColumn({name: "level_id"})
  level: Level

  @ManyToOne(() => Skill)
  @JoinColumn({name: "skill_id"})
  skill: Skill;

  @ManyToOne(() => Job, {cascade: true, onDelete:'CASCADE'})
  @JoinColumn({name: "job_id"})
  job: Job

  @CreateDateColumn()
  created_at: Date;

}