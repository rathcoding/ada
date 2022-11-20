import { MigrationInterface, QueryRunner } from "typeorm"

export class StageSeeder1668878843729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO
            stage(description)
        VALUES
            ('Inscrita'),
            ('Selecionada'),
            ('Testes'),
            ('Entrevistas'),
            ('Proposta'),
            ('Contratada'),
            ('Não-selecionada'),
            ('Vaga excluída');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM stage`);
    }

}
