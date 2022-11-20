import { MigrationInterface, QueryRunner } from "typeorm"

export class ApplicationSeeder1668883262421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        // INSERT INTO
        //     application(description)
        // VALUES
        //     ('Júnior'),
        //     ('Pleno'),
        //     ('Sênior');
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM application`);
    }

}
