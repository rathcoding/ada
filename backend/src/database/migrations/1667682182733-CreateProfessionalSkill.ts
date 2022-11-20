import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProfessionalSkill1667682182733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "professional_skill",
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
                        name: "professional_id",
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
                        name: "fk_professional_skill_level",
                        columnNames: ["level_id"],
                        referencedTableName: "level",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_professional_skill_skill",
                        columnNames: ["skill_id"],
                        referencedTableName: "skill",
                        referencedColumnNames: ['id']
                    },
                    {
                        name: "fk_professional_skill_professional",
                        columnNames: ["professional_id"],
                        referencedTableName: "professional",
                        referencedColumnNames: ['id']
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("professional_skill")
    }

}
