/*
  Warnings:

  - You are about to drop the column `likecount` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "likecount",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0;
