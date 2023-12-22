import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1703220949098 implements MigrationInterface {
    name = 'SecondMigration1703220949098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10"`);
    }

}
