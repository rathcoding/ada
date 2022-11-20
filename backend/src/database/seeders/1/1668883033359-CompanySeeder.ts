import { MigrationInterface, QueryRunner } from "typeorm"

export class CompanySeeder1668883033359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO
            company(email, password, name, description, cnpj)
        VALUES
            ('contact@techhavoc.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'TechHavoc', 'Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur aliquet quam id dui posuere blandit.', '18901340199699'),
            ('carrier@hustledev.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Hustledev', 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus.', '09913576201310'),
            ('jobs@tech couch.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Tech Couch', 'Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada. Proin eget tortor risus.', '39158629199888'),
            ('contact@techtron.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Techtron', 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '46711417201772'),
            ('jobs@geekstar.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Geekstar', 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta.', '77156838200480'),
            ('info@nikesh.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Nikesh', 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.', '33821633201452'),
            ('carrier@fasttech.io.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'FastTech.io', 'Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.', '4214552198903'),
            ('carrier@purotech.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'Purotech', 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh. Pellentesque in ipsum id orci porta dapibus.', '36957683202265'),
            ('info@devboo.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'devboo', 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada.', '56825654200567'),
            ('contact@devgeneral.com', '$2b$10$f17gnAZ13FNBNY54fg9Fs.wf10ockdgnLWfyNXVrbQuvHMAFr0w7G', 'devGeneral', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.', '10780665198314');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
