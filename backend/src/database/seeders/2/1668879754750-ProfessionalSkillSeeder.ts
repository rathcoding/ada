import { MigrationInterface, QueryRunner } from "typeorm"

export class ProfessionalSkillSeeder1668879754750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO
            professional_skill(professional_id, skill_id, level_id, experience)
        VALUES
            (1, 51, 3, 3.5),
            (1, 55, 3, 4.1),
            (1, 12, 1, 6.4),
            (1, 24, 3, 5.6),
            (1, 52, 2, 4.4),
            (2, 25, 2, 1.5),
            (2, 24, 3, 2.8),
            (2, 29, 1, 1.5),
            (2, 1, 2, 1.0),
            (2, 51, 1, 5.6),
            (2, 52, 1, 1.0),
            (2, 48, 1, 5.6),
            (3, 53, 3, 2.7),
            (3, 55, 1, 3.8),
            (3, 29, 1, 0.4),
            (3, 24, 1, 5.8),
            (3, 47, 2, 3.7),
            (3, 1, 2, 5.7),
            (3, 42, 1, 0.6),
            (3, 31, 3, 4.5),
            (3, 45, 1, 1.9),
            (4, 26, 3, 5.5),
            (4, 9, 1, 3.1),
            (4, 42, 1, 1.0),
            (4, 33, 3, 0.4),
            (5, 5, 2, 5.6),
            (5, 37, 2, 4.1),
            (5, 10, 2, 3.8),
            (5, 41, 3, 2.7),
            (5, 25, 3, 2.1),
            (5, 38, 3, 1.1),
            (5, 12, 2, 3.0),
            (5, 53, 1, 6.0),
            (5, 23, 2, 5.6),
            (6, 7, 2, 2.1),
            (6, 4, 3, 1.8),
            (6, 46, 3, 3.8),
            (6, 42, 3, 4.9),
            (6, 15, 2, 3.8),
            (6, 24, 2, 3.7),
            (6, 54, 2, 6.7),
            (6, 40, 1, 4.5),
            (7, 38, 2, 1.2),
            (7, 45, 2, 2.8),
            (7, 53, 3, 5.9),
            (7, 17, 1, 1.6),
            (7, 4, 1, 6.2),
            (7, 24, 1, 1.9),
            (7, 54, 2, 2.8),
            (7, 36, 3, 2.2),
            (8, 37, 3, 2.3),
            (8, 56, 3, 3.8),
            (8, 20, 3, 0.6),
            (8, 5, 2, 6.4),
            (8, 19, 2, 0.7),
            (8, 3, 2, 3.0),
            (8, 10, 1, 1.8),
            (8, 7, 2, 2.4),
            (9, 19, 2, 5.6),
            (9, 15, 2, 0.5),
            (9, 27, 3, 6.1),
            (9, 3, 2, 4.3),
            (9, 26, 3, 5.8),
            (9, 16, 1, 6.4),
            (9, 54, 3, 4.0),
            (9, 56, 3, 3.7),
            (10, 48, 1, 3.8),
            (10, 45, 2, 6.2),
            (10, 8, 2, 4.9),
            (10, 44, 1, 3.6),
            (10, 20, 3, 4.7),
            (10, 11, 1, 3.9),
            (10, 47, 2, 6.9),
            (10, 6, 2, 0.7),
            (11, 4, 3, 1.9),
            (11, 48, 3, 1.1),
            (11, 49, 3, 1.7),
            (11, 28, 3, 5.1),
            (11, 26, 2, 3.5),
            (11, 7, 1, 6.8),
            (11, 51, 3, 1.2),
            (11, 11, 2, 5.8),
            (12, 40, 2, 5.3),
            (12, 13, 2, 5.8),
            (12, 28, 2, 5.4),
            (12, 49, 3, 4.8),
            (12, 48, 1, 4.2),
            (12, 50, 2, 5.8),
            (12, 11, 3, 6.6),
            (13, 44, 2, 0.3),
            (13, 56, 1, 4.4),
            (13, 45, 2, 2.6),
            (13, 19, 2, 6.5),
            (13, 38, 1, 6.4),
            (13, 55, 2, 2.4),
            (13, 20, 1, 3.2),
            (13, 4, 3, 2.9),
            (13, 32, 3, 2.4),
            (13, 55, 2, 1.0),
            (14, 19, 1, 6.2),
            (14, 29, 3, 5.0),
            (14, 9, 2, 2.1),
            (14, 53, 1, 3.1),
            (14, 48, 2, 0.8),
            (14, 38, 3, 3.4),
            (14, 43, 1, 4.2),
            (14, 4, 1, 3.3),
            (14, 3, 3, 0.9),
            (14, 15, 1, 1.2),
            (15, 42, 2, 1.1),
            (15, 29, 3, 4.9),
            (15, 43, 2, 6.1),
            (15, 12, 2, 5.2),
            (15, 46, 2, 3.2),
            (15, 39, 1, 4.4),
            (15, 36, 2, 0.6),
            (16, 23, 1, 0.1),
            (16, 45, 1, 6.5),
            (16, 19, 2, 5.9),
            (16, 37, 2, 0.2),
            (16, 15, 1, 5.7),
            (16, 13, 1, 4.4),
            (16, 43, 3, 1.3),
            (16, 8, 1, 2.4),
            (17, 4, 1, 1.1),
            (17, 17, 3, 5.8),
            (17, 37, 1, 6.3),
            (17, 48, 1, 3.5),
            (17, 39, 2, 1.8),
            (17, 20, 3, 0.7),
            (17, 36, 1, 5.9),
            (17, 30, 1, 2.8),
            (17, 32, 1, 1.4),
            (18, 43, 3, 1.7),
            (18, 54, 1, 4.2),
            (18, 52, 2, 2.3),
            (18, 19, 3, 3.1),
            (18, 41, 2, 3.1),
            (18, 46, 1, 2.0),
            (18, 51, 1, 3.6),
            (18, 56, 2, 4.8),
            (18, 26, 3, 5.6),
            (19, 32, 1, 4.3),
            (19, 37, 2, 2.9),
            (19, 48, 1, 1.4),
            (20, 2, 3, 2.7),
            (20, 10, 1, 2.4),
            (20, 13, 2, 4.4),
            (20, 44, 1, 6.7),
            (20, 45, 3, 1.1),
            (20, 28, 3, 5.9),
            (20, 26, 1, 6.1),
            (20, 9, 3, 3.1),
            (20, 56, 1, 6.7),
            (20, 32, 1, 4.3);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM professional_skill`);
    }

}
