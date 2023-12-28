import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex,
  TableUnique,
  Table,
} from 'typeorm';

export class UserUpdate1703738751148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'firstName',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'lastName',
        type: 'varchar',
        isNullable: false,
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

    await queryRunner.createUniqueConstraint(
      'user',
      new TableIndex({ columnNames: ['username'] }),
    );

    await queryRunner.createUniqueConstraint(
      'user',
      new TableIndex({ columnNames: ['email'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'firstName');
    await queryRunner.dropColumn('user', 'lastName');
    await queryRunner.dropColumn('user', 'createdAt');
    await queryRunner.dropColumn('user', 'updatedAt');

    const userTable: Table = await queryRunner.getTable('user');

    const userNametableUniqueRow: TableUnique = userTable.uniques.find(
      (row) =>
        row.columnNames.includes('username') && row.columnNames.length === 1,
    );
    const emailtableUniqueRow: TableUnique = userTable.uniques.find(
      (row) =>
        row.columnNames.includes('email') && row.columnNames.length === 1,
    );

    await queryRunner.dropUniqueConstraint('user', userNametableUniqueRow);
    await queryRunner.dropUniqueConstraint('user', emailtableUniqueRow);
  }
}
