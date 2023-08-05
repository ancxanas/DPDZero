/*
  Warnings:

  - You are about to drop the column `value` on the `Data` table. All the data in the column will be lost.
  - Added the required column `data` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "value",
ADD COLUMN     "data" JSONB NOT NULL;
