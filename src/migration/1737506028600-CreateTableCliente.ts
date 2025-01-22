import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableCliente1737506028600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cliente",
            columns: [
                {
                    name: "id",
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: "increment",
                    type: "int"
                },
                {
                    name: "cpf",
                    type: "varchar",
                    length: "14"
                },
                {
                    name: "numCompras",
                    type: "int"
                },
                {
                    name: "userId",
                    type: "int"
                }
            ]
        }), true)

        await queryRunner.createForeignKey('cliente',
            new TableForeignKey({
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cliente');
    }

}
