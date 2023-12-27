import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateBookingTable1612345678901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'booking',
    //     columns: [
    //       { name: 'id', type: 'serial', isPrimary: true },
    //       { name: 'startTime', type: 'timestamp', isNullable: false },
    //       { name: 'endTime', type: 'timestamp', isNullable: false },
    //     ],
    //   }),
    //   true,
    // );

    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: false 
      }),
    );
    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'vehicleId',
        type: 'int',
        isNullable: false 
      }),
    );
    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP' 
      }),
    );
    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate:"CURRENT_TIMESTAMP"
      }),
    );
    
    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'booking',
      new TableForeignKey({
        columnNames: ['vehicleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicle',
        onDelete: 'CASCADE', 
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('booking', 'FK_booking_userId');
    await queryRunner.dropForeignKey('booking', 'FK_booking_vehicleId');
    await queryRunner.dropTable('booking');
  }
}
