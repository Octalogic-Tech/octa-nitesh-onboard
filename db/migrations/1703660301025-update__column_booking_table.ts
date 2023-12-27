import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnBookingTable1703660301025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_UNIQUE_USER"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_UNIQUE_USER" ON "booking" ("userId")`);
    }
}
