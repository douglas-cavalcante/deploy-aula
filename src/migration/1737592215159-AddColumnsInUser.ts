import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsInUser1737592215159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.addColumns("user", [
        //     new TableColumn(
        //         {
        //             name: "password",
        //             type: "varchar",
        //             isNullable: false,
        //         },
        //     ),
        //     new TableColumn(
        //     {
        //         name: "login",
        //         type: "varchar",
        //     })
        // ])

        await queryRunner.query(
            `ALTER TABLE "user" add "login" varchar(200) null`
        )

        await queryRunner.query(
            `ALTER TABLE "user" add "password" varchar(200) null`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropColumns("user", ["password", "login"])
        await queryRunner.query(
            `ALTER TABLE "user" drop column "password"`
        )

        await queryRunner.query(
            `ALTER TABLE "user" drop column "login"`
        )
    }

}
