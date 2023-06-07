/*
  Warnings:

  - A unique constraint covering the columns `[user_type,id,user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_user_type_user_id_fkey";

-- DropIndex
DROP INDEX "User_id_user_type_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_type_id_user_email_key" ON "User"("user_type", "id", "user_email");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_type_user_id_user_email_fkey" FOREIGN KEY ("user_type", "user_id", "user_email") REFERENCES "User"("user_type", "id", "user_email") ON DELETE RESTRICT ON UPDATE CASCADE;
