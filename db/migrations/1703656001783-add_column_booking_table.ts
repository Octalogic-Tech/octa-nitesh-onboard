import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddColumnBookingTable1703656001783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('booking', [
            new TableColumn({ name: 'userId', type: 'int' }),
            new TableColumn({ name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' }), 
            new TableColumn({ name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
        ]);

        await queryRunner.createForeignKey('booking', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex('booking', new TableIndex({ columnNames: ['userId'], isUnique: true, name: 'IDX_UNIQUE_USER' }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey('booking', 'FK_USER_BOOKING');

        await queryRunner.dropColumns('booking', ['userId', 'createdAt', 'updatedAt']);

        // await queryRunner.dropIndex('booking', 'IDX_UNIQUE_USER');
    }
}
