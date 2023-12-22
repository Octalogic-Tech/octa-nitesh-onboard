import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateVehicleTable1612345678902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'vehicle',
            columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'name', type: 'varchar', isNullable: false },
                { name: 'brand', type: 'varchar', isNullable: false },
                { name: 'model', type: 'varchar', isNullable: false },
                { name: 'year', type: 'varchar', isNullable: false },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vehicle');
    }
}
