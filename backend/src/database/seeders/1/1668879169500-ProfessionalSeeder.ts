import { MigrationInterface, QueryRunner } from "typeorm"

export class ProfessionalSeeder1668879169500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO
            professional(email, password, name, last_name, birth_date)
        VALUES
            ('morgan@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Janice', 'Morgan', '2002-12-06'),
            ('shanonm@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Shanon', 'Marvin', '1985-06-20'),
            ('horton.marilyn@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Marilyn', 'Horton', '2003-01-11'),
            ('mbasa@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Clair', 'Mbasa Abebi', '1983-08-26'),
            ('xiuan@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Marie', 'Xiuan', '2001-07-14'),
            ('jgarth@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Joanna', 'Garth', '1999-05-07'),
            ('zoe.mills@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Zoe', 'Mills', '1994-06-03'),
            ('nicola.sanderson@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Nicola', 'Sanderson', '1995-05-25'),
            ('tracey.newman@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Tracey', 'Newman', '1999-04-10'),
            ('anne.gibson@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Anne', 'Gibson', '1982-09-20'),
            ('bella.hudson@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Bella', 'Hudson', '1991-04-02'),
            ('lily.hill@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Lily', 'Hill', '1993-07-14'),
            ('natalie.walker@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Natalie', 'Walker', '1994-04-28'),
            ('grace.gibson@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Grace', 'Gibson', '1998-01-08'),
            ('angela.edmunds@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Angela', 'Edmunds', '2004-03-21'),
            ('vanessa.lawrence@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Vanessa', 'Lawrence', '1996-07-21'),
            ('angela.lambert@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Angela', 'Lambert', '1981-06-02'),
            ('natalie.poole@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Natalie', 'Poole', '1991-09-19'),
            ('kylie.randall@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Kylie', 'Randall', '1994-06-19'),
            ('claire.lawrence@ada.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Claire', 'Lawrence', '2002-07-15')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM professional`);
    }

}
