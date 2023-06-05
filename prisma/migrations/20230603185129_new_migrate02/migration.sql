/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,user_type]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,user_type]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_user_type_user_id_fkey";

-- DropIndex
DROP INDEX "Employee_user_type_user_id_key";

-- DropIndex
DROP INDEX "User_user_type_id_key";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_type" SET DEFAULT 'CUSTOMER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_id_user_type_key" ON "Employee"("user_id", "user_type");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_user_type_key" ON "User"("id", "user_type");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_type_user_id_fkey" FOREIGN KEY ("user_type", "user_id") REFERENCES "User"("user_type", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
