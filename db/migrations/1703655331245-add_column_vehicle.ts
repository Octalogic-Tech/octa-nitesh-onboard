import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddColumnVehicle1703655331245 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('vehicle', [
            new TableColumn({ name: 'quantity', type: 'int', default: '5' }),
            new TableColumn({ name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }),
            new TableColumn({ name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
        ]);

        await queryRunner.createIndex('vehicle', new TableIndex({ columnNames: ['brand', 'model', 'year'], isUnique: true }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('vehicle', ['quantity', 'createdAt', 'updatedAt']);

        await queryRunner.dropIndex('vehicle', 'IDX_UNIQUE_BRAND_MODEL_YEAR');
    }
}
