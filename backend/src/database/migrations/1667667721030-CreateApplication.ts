import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateApplication1667667721030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "application",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment" 
                    },
                    {
                        name: "match",
                        type: "real",
                    },
                    {
                        name: "feedback",
                        type: "varchar",
                    },
                    {
                        name: "job_id",
                        type: "integer",
                    },
                    {
                        name: "professional_id",
                        type: "integer",
                    },
                    {
                        name: "stage_id",
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
                        name: "fk_application_job",
                        columnNames: ["job_id"],
                        referencedTableName: "job",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_application_professional",
                        columnNames: ["professional_id"],
                        referencedTableName: "professional",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_application_stage",
                        columnNames: ["stage_id"],
                        referencedTableName: "stage",
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("application")
    }

}
