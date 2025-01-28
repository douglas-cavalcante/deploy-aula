import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProducts1738018273371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
            name: 'products',
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    isGenerated: true,
                    type: "int",
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "200"
                }, 
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "amount",
                    type: "int"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "sale",
                    type: "boolean",
                    default: false
                },
                {
                    name: "discount",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    default: 0
                },
                {
                    name: "status",
                    type: "boolean",
                    default: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }
      ), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
