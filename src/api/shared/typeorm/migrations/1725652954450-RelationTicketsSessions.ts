import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationTicketsSessions1725652954450 implements MigrationInterface {
    name = 'RelationTicketsSessions1725652954450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chair" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "sessionId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_tickets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chair" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "sessionId" integer, CONSTRAINT "FK_d175b024857bfa9676f6a06368f" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE CASCADE  ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tickets"("id", "chair", "value", "created_at", "updated_at", "sessionId") SELECT "id", "chair", "value", "created_at", "updated_at", "sessionId" FROM "tickets"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`ALTER TABLE "temporary_tickets" RENAME TO "tickets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" RENAME TO "temporary_tickets"`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "chair" varchar NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "sessionId" integer)`);
        await queryRunner.query(`INSERT INTO "tickets"("id", "chair", "value", "created_at", "updated_at", "sessionId") SELECT "id", "chair", "value", "created_at", "updated_at", "sessionId" FROM "temporary_tickets"`);
        await queryRunner.query(`DROP TABLE "temporary_tickets"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }

}
