/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Data_key_key" ON "Data"("key");
