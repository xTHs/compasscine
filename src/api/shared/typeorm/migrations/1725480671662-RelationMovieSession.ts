import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationMovieSession1725480671662 implements MigrationInterface {
  name = 'RelationMovieSession1725480671662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_sessao" ("id" int PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" int NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at" FROM "sessao"`,
    );
    await queryRunner.query(`DROP TABLE "sessao"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessao" RENAME TO "sessao"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sessao" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "sessao"`,
    );
    await queryRunner.query(`DROP TABLE "sessao"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessao" RENAME TO "sessao"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "actors" text NOT NULL, "genre" varchar NOT NULL, "release_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_movies"("id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at") SELECT "id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at" FROM "movies"`,
    );
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_movies" RENAME TO "movies"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sessao" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer, CONSTRAINT "FK_ccd11c3ab7e6616ed1eed997cf2" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "sessao"`,
    );
    await queryRunner.query(`DROP TABLE "sessao"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessao" RENAME TO "sessao"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessao" RENAME TO "temporary_sessao"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessao" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "temporary_sessao"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessao"`);
    await queryRunner.query(
      `ALTER TABLE "movies" RENAME TO "temporary_movies"`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" int PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "actors" varchar NOT NULL, "genre" varchar NOT NULL, "release_date" date NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "movies"("id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at") SELECT "id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at" FROM "temporary_movies"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_movies"`);
    await queryRunner.query(
      `ALTER TABLE "sessao" RENAME TO "temporary_sessao"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessao" ("id" int PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" int NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "temporary_sessao"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessao"`);
    await queryRunner.query(
      `ALTER TABLE "sessao" RENAME TO "temporary_sessao"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessao" ("id" int PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" int NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "sessao"("id", "room", "capacity", "day", "time", "created_at", "updated_at") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at" FROM "temporary_sessao"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessao"`);
  }
}
