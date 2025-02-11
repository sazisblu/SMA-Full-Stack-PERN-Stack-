-- AlterTable
ALTER TABLE "post" ADD COLUMN     "userID" INTEGER;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
