-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "employee_type" SET DEFAULT ARRAY['STORE_ADMIN']::"EmployeeType"[];
