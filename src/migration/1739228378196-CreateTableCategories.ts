import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCategories1739228378196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(new Table(
            {
                "name": "categories",
                "columns": [
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
                ]
            }
          ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("categories")
    }

}
