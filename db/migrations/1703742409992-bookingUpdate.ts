import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class BookingUpdate1703742409992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add userId column
    await queryRunner.addColumns('booking', [
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    ]);

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
    await queryRunner.dropColumn('booking', 'userId');
    await queryRunner.dropColumn('booking', 'createdAt');
    await queryRunner.dropColumn('booking', 'updatedAt');
  }
}
