import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterBookinDate1703243031111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename the 'startTime' column to 'startDate'
        await queryRunner.renameColumn('booking', 'startTime', 'startDate');
        await queryRunner.renameColumn('booking', 'endTime', 'endDate');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the change by renaming 'startDate' back to 'startTime'
        await queryRunner.renameColumn('booking', 'startDate', 'startTime');
        await queryRunner.renameColumn('booking', 'endDate', 'endTime');
    }
}
