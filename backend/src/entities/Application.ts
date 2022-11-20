import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Job } from "./Job";
import { Professional } from "./Professional";
import { Stage } from "./Stage";
// import { Application } from "./Application";

@Entity("application")
export class Application {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  match: number;

  @Column("text")
  feedback: string;

  @Column()
  stage_id: number;

  @Column()
  job_id: number;

  @Column()
  professional_id: number;

  @ManyToOne(() => Stage)
  @JoinColumn({name: "stage_id"})
  stage: Stage

  @ManyToOne(() => Job)
  @JoinColumn({name: "job_id"})
  job: Job;

  @ManyToOne(() => Professional)
  @JoinColumn({name: "professional_id"})
  professional: Professional

  @CreateDateColumn()
  created_at: Date;

}