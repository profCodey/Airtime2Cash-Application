/*
  Warnings:

  - Added the required column `updatedAt` to the `TxRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TxRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "amountToReceive" INTEGER NOT NULL,
    "network" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TxRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TxRecord" ("amount", "amountToReceive", "createdAt", "email", "id", "network", "phone", "status", "userId") SELECT "amount", "amountToReceive", "createdAt", "email", "id", "network", "phone", "status", "userId" FROM "TxRecord";
DROP TABLE "TxRecord";
ALTER TABLE "new_TxRecord" RENAME TO "TxRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
