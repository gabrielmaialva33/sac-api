import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSacs1638552358854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sacs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'text',
            isUnique: true
          },
          {
            name: 'url',
            type: 'varchar'
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
