import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1737504120988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    isGenerated: true,
                    type: "int",
                    generationStrategy: "increment"
                },
                {
                    name: "firstName",
                    type: "varchar",
                    length: "200"
                },
                {
                    name: "lastName",
                    type: "varchar"
                },
                {
                    name: "age",
                    type: "int",
                    default: 18
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
