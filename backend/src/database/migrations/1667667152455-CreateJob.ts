import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateJob1667667152455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "job",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment" 
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "salary_min",
                        type: "real",
                    },
                    {
                        name: "salary_max",
                        type: "real",
                    },
                    {
                        name: "dt_start",
                        type: "varchar",
                    },
                    {
                        name: "dt_end",
                        type: "varchar",
                    },
                    {
                        name: "match_min",
                        type: "real",
                    },
                    {
                        name: "company_id",
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
                        name: "fk_job_company",
                        columnNames: ["company_id"],
                        referencedTableName: "company",
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("job")
    }

}
