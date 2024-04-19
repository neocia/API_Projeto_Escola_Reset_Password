import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1713544762808 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table ({
          name:"login_senha",
          columns:[
            {
              name: 'id',
              type: 'uuid',
              isPrimary:true,
              generationStrategy:'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name:'nomeCompleto',
              type:'varchar',
            },
            {
              name:'RG',
              type:'varchar',
              isUnique: true,
            },
            {
              name:'password',
              type:'varchar',
            },
            {
              name:'email',
              type:'varchar',
              isUnique: true,
            },
            {
              name:'avatar',
              type:'varchar',
              isNullable: true,
            },
            {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            },
            {
            name:'update_at',
            type:'timestamp with time zone',
            default:'now()',
            },
          ],
        }),
      );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('login_senha');
    }

}
