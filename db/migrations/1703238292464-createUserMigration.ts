import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from 'typeorm';

export class CreateUserTable1612345678901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [

       // await queryRunner.createTable( //creating a table
    //   new Table({
    //     name: 'user',
    //     columns: [
    //       { name: 'id', type: 'serial', isPrimary: true },
    //       { name: 'username', type: 'varchar', isNullable: false },
    //       { name: 'email', type: 'varchar', isNullable: false },
    //     ],
    //   }),
    //   true,
    // );

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
    ]);

    await queryRunner.addColumns('user', [
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

    await queryRunner.createUniqueConstraint('user', new TableIndex({ columnNames: ['username'] }));

    await queryRunner.createUniqueConstraint('user', new TableIndex({ columnNames: ['email'] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'firstName');
    await queryRunner.dropColumn('user', 'lastName');
    await queryRunner.dropColumn('user', 'createdAt');
    await queryRunner.dropColumn('user', 'updatedAt');
    await queryRunner.dropIndex('user', 'IDX_UNIQUE_USERNAME');
    await queryRunner.dropIndex('user', 'IDX_UNIQUE_EMAIL');
  }
}
