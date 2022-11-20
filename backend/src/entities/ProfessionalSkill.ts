import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Professional } from "./Professional";
import { Skill } from "./Skill";
import { Level } from "./Level";

@Entity("professional_skill")
export class ProfessionalSkill {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  experience: number;

  @ManyToOne(() => Level)
  @JoinColumn({name: "level_id"})
  level: Level

  @Column()
  level_id: number

  @ManyToOne(() => Skill)
  @JoinColumn({name: "skill_id"})
  skill: Skill;

  @Column()
  skill_id: number

  @ManyToOne(() => Professional)
  @JoinColumn({name: "professional_id"})
  professional: Professional

  @Column()
  professional_id: number

  @CreateDateColumn()
  created_at: Date;

}