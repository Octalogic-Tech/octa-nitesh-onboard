import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class CreateVehicleTable1612345678902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'vehicle',
    //     columns: [
    //       { name: 'id', type: 'serial', isPrimary: true },
    //       { name: 'name', type: 'varchar', isNullable: false },
    //       { name: 'brand', type: 'varchar', isNullable: false },
    //       { name: 'model', type: 'varchar', isNullable: false },
    //       { name: 'year', type: 'varchar', isNullable: false },
    //     ],
    //   }),
    //   true,
    // );
    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'quantity',
        type: 'int',
        default: 5,
      }),
    );

    await queryRunner.addColumns('vehicle', [
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'quantity');
    await queryRunner.dropColumn('user', 'createdAt');
    await queryRunner.dropColumn('user', 'updatedAt');
  }
}
