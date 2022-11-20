import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity("company")
export class Company {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  created_at: Date;

}