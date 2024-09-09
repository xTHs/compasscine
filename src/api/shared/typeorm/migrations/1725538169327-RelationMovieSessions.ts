import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationMoviesessions1725538169327 implements MigrationInterface {
  name = 'RelationMoviesessions1725538169327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_sessions" ("id" integer PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at" FROM "sessions"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessions" RENAME TO "sessions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sessions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "sessions"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessions" RENAME TO "sessions"`,
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
      `CREATE TABLE "temporary_sessions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer, CONSTRAINT "FK_f056a463749c7b7b6700511bed7" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "sessions"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sessions" RENAME TO "sessions"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME TO "temporary_sessions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" datetime NOT NULL, "time" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "temporary_sessions"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessions"`);
    await queryRunner.query(
      `ALTER TABLE "movies" RENAME TO "temporary_movies"`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "actors" varchar NOT NULL, "genre" varchar NOT NULL, "release_date" date NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "movies"("id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at") SELECT "id", "name", "description", "actors", "genre", "release_date", "created_at", "updated_at" FROM "temporary_movies"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_movies"`);
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME TO "temporary_sessions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" integer PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "movieId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at", "movieId" FROM "temporary_sessions"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessions"`);
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME TO "temporary_sessions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" integer PRIMARY KEY NOT NULL, "room" varchar NOT NULL, "capacity" integer NOT NULL, "day" timestamp NOT NULL DEFAULT (now()), "time" datatime NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`,
    );
    await queryRunner.query(
      `INSERT INTO "sessions"("id", "room", "capacity", "day", "time", "created_at", "updated_at") SELECT "id", "room", "capacity", "day", "time", "created_at", "updated_at" FROM "temporary_sessions"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sessions"`);
  }
}
