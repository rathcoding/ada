import { MigrationInterface, QueryRunner } from "typeorm"

export class JobSeeder1668883067126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO
            job(company_id, title, description, salary_min, salary_max, dt_start, dt_end, match_min)
        VALUES
            (6, 'Desenvolvedora Front-end', 'Donec rutrum congue leo eget malesuada. Sed porttitor lectus nibh.', 4742, 7113, '2022-11-11', '2023-01-05', 45),
            (9, 'Front-end Developer', 'Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh.', 5466, 8199, '2022-11-15', '2022-12-25', 40),
            (2, 'UX/UI Specialist', 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', 6839, 10258, '2022-11-09', '2023-01-07', 42),
            (9, 'Front-end Vue.js', 'Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.', 4656, 6984, '2022-11-19', '2023-01-02', 45),
            (9, 'React.js developer', 'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', 5138, 7707, '2022-11-13', '2023-01-04', 50),
            (10, 'Node.js + Postgres Developer', 'Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt.', 5270, 7905, '2022-11-19', '2023-01-02', 40),
            (10, 'Back-end Developer', 'Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta.', 6921, 10381, '2022-11-14', '2023-01-12', 42),
            (4, 'API Expert', 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.', 4707, 7060, '2022-11-06', '2022-12-11', 40),
            (10, 'backend dev', 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.', 5409, 8113, '2022-11-16', '2022-12-27', 47),
            (7, 'Desenvolvedora back-end', 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus.', 5837, 8755, '2022-11-19', '2022-12-23', 42),
            (1, 'Engenheira de Software', 'Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.', 6936, 10404, '2022-11-07', '2022-12-31', 40),
            (7, 'Analista de Sistemas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', 6354, 9531, '2022-11-18', '2023-01-05', 44),
            (2, 'Data Science Engineer', 'Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada.', 5895, 8842, '2022-11-17', '2023-01-01', 41),
            (7, 'Data Scientist', 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.', 6070, 9105, '2022-11-04', '2022-12-09', 45),
            (5, 'Mobile developer', 'Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.', 6420, 9630, '2022-11-08', '2022-12-21', 30),
            (8, 'Desenvolvedora Mobile', 'Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', 6369, 9553, '2022-11-12', '2023-01-04', 35),
            (10, 'Android Developer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.', 6696, 10044, '2022-11-05', '2022-12-28', 35),
            (7, 'Squad Leader', 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.', 5810, 8715, '2022-11-15', '2022-12-25', 41),
            (5, 'Scrum Master', 'Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', 6454, 9681, '2022-11-06', '2022-12-12', 38),
            (1, 'Project Manager', 'Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus.', 5032, 7548, '2022-11-12', '2022-12-27', 44);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM job`);
    }

}
