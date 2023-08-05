/*
  Warnings:

  - You are about to drop the column `data` on the `Data` table. All the data in the column will be lost.
  - Added the required column `key` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "data",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
