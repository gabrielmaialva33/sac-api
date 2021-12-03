import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class createIssues1638554713242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'issues',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'title',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true
          },
          {
            name: 'sac_id',
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
            type: ' timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: ' timestamp with time zone',
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
      'issues',
      new TableForeignKey({
        name: 'sac_fk',
        columnNames: ['sac_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sacs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('issues', 'sac_fk');
    await queryRunner.dropTable('issues');
  }
}
