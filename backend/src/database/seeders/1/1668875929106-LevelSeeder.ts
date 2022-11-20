import { MigrationInterface, QueryRunner } from "typeorm"

export class LevelSeeder1668875929106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO
            level(description)
        VALUES
            ('Júnior'),
            ('Pleno'),
            ('Sênior');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM level`);
    }

}
