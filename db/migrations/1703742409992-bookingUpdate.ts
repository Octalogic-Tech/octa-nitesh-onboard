import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class BookingUpdate1703742409992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add userId column
    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'vehicleId',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );

    await queryRunner.addColumn(
      'booking',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE', 
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('booking', 'FK_booking_userId');
    await queryRunner.dropColumn('booking', 'userId');
    await queryRunner.dropColumn('booking', 'vehicleId');
    await queryRunner.dropColumn('booking', 'createdAt');
    await queryRunner.dropColumn('booking', 'updatedAt');
  }
}
