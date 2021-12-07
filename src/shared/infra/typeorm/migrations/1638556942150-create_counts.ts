import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class createCounts1638556942150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'counts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'issue_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            default: false
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: ' timestamp with time zone',
            isNullable: true,
            default: null
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'counts',
      new TableForeignKey({
        name: 'issue_fk',
        columnNames: ['issue_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'issues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('counts', 'issue_fk');
    await queryRunner.dropTable('counts');
  }
}
