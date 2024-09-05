import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSession1725385716443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            isPrimary: true,
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'capacity',
            type: 'INTEGER',
          },
          {
            name: 'day',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'time',
            type: 'datatime',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessao');
  }
}
