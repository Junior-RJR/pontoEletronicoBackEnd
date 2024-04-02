/*
  Warnings:

  - You are about to drop the column `pointType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "key", "name") SELECT "id", "key", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
