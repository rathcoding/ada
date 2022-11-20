import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateJobSkill1667682189653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "job_skill",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment" 
                    },
                    {
                        name: "experience",
                        type: "real",
                    },
                    {
                        name: "level_id",
                        type: "integer",
                    },
                    {
                        name: "skill_id",
                        type: "integer",
                    },
                    {
                        name: "job_id",
                        type: "integer",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_job_skill_level",
                        columnNames: ["level_id"],
                        referencedTableName: "level",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_job_skill_skill",
                        columnNames: ["skill_id"],
                        referencedTableName: "skill",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_job_skill_job",
                        columnNames: ["job_id"],
                        referencedTableName: "job",
                        referencedColumnNames: ['id']
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("job_skill")
    }

}
