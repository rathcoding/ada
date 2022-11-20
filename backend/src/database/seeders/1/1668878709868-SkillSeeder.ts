import { MigrationInterface, QueryRunner } from "typeorm"

export class SkillSeeder1668878709868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        INSERT INTO
            skill(type, description)
        VALUES
            ('HARD', 'Agile'),
            ('HARD', 'Amazon DynamoDB'),
            ('HARD', 'Angular'),
            ('HARD', 'ASP.NET'),
            ('HARD', 'C'),
            ('HARD', 'C#'),
            ('HARD', 'C++'),
            ('HARD', 'CSS'),
            ('HARD', 'Dart'),
            ('HARD', 'Django'),
            ('HARD', 'Express'),
            ('HARD', 'Figma'),
            ('HARD', 'Firebase'),
            ('HARD', 'Flask'),
            ('HARD', 'Flutter'),
            ('HARD', 'Go'),
            ('HARD', 'HTML'),
            ('HARD', 'IBM DB2'),
            ('HARD', 'Java'),
            ('HARD', 'JavaScript'),
            ('HARD', 'Jira'),
            ('HARD', 'jQuery'),
            ('HARD', 'Kanban'),
            ('HARD', 'Kotlin'),
            ('HARD', 'Laravel'),
            ('HARD', 'MariaDB'),
            ('HARD', 'Microsoft SQL Server'),
            ('HARD', 'MongoDB'),
            ('HARD', 'MySQL'),
            ('HARD', 'Neo4J'),
            ('HARD', 'Next.js'),
            ('HARD', 'Node.js'),
            ('HARD', 'Objective-C'),
            ('HARD', 'Oracle'),
            ('HARD', 'Perl'),
            ('HARD', 'PHP'),
            ('HARD', 'PostgreSQL'),
            ('HARD', 'PowerShell'),
            ('HARD', 'Python'),
            ('HARD', 'R'),
            ('HARD', 'React.js'),
            ('HARD', 'Redis'),
            ('HARD', 'Ruby on Rails'),
            ('HARD', 'Ruby'),
            ('HARD', 'Rust'),
            ('HARD', 'SASS'),
            ('HARD', 'Scala'),
            ('HARD', 'Scrum'),
            ('HARD', 'Shell'),
            ('HARD', 'Spring'),
            ('HARD', 'SQLite'),
            ('HARD', 'Swift'),
            ('HARD', 'TypeScript'),
            ('HARD', 'UI Design'),
            ('HARD', 'UX Design'),
            ('HARD', 'Vue.js');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM skill`);
    }

}
