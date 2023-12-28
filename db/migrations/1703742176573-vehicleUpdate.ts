import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class VehicleUpdate1703742176573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('vehicle', [
      new TableColumn({
        name: 'quantity',
        type: 'int',
        default: 5,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('vehicle', 'quantity');
    await queryRunner.dropColumn('vehicle', 'createdAt');
    await queryRunner.dropColumn('vehicle', 'updatedAt');
  }
}
