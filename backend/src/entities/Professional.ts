import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { ProfessionalSkill } from "./ProfessionalSkill";

@Entity("professional")
export class Professional {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  birth_date: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ProfessionalSkill, (professionalSkill) => professionalSkill.professional_id)
  skills: ProfessionalSkill[];

}