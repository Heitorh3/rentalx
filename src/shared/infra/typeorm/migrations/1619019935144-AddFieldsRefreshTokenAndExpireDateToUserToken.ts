import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsRefreshTokenAndExpireDateToUserToken1619019935144
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user_tokens', [
      new TableColumn({
        name: 'expires_date',
        type: 'date',
        isNullable: true,
      }),
      new TableColumn({
        name: 'refresh_token',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_tokens', 'expires_date');
    await queryRunner.dropColumn('user_tokens', 'refresh_token');
  }
}
