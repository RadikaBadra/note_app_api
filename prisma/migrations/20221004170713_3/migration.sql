/*
  Warnings:

  - You are about to drop the column `author` on the `notes` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notes` DROP COLUMN `author`,
    ADD COLUMN `author_id` INTEGER NOT NULL;
