import {MigrationInterface, QueryRunner} from "typeorm";

export class migrate11645344236850 implements MigrationInterface {
    name = 'migrate11645344236850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`author\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Article\``);
    }

}
