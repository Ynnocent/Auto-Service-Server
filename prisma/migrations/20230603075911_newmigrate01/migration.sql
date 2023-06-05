-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('EMPLOYEE', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('STORE_ADMIN', 'WAREHOUSE_MANAGER', 'SALES', 'MARKETING', 'MECHANIC');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('OIL_CHANGE', 'TIRE_REPAIR', 'ITEM_PURCHASE', 'WINDSHIELD_REPAIR', 'INSPECTION', 'AIR_FILTER_REPLACE', 'BRAKE_WORK', 'ENGINE_TUNE_UP', 'BATTERY_REPLACEMENT', 'SCHEDULED_MAINTENANCE', 'WIPER_BLADES_REPLACEMENT');

-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('SEDAN', 'SUV', 'TRUCK', 'MINIVAN', 'COUPE', 'SPORTS', 'STATION_WAGON', 'HATCHBACK', 'CONVERTABLE', 'CROSSOVER', 'VAN', 'MUV');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_fname" TEXT NOT NULL,
    "user_lname" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "user_type" "UserType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "employee_type" "EmployeeType"[],
    "hire_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "store_phone" TEXT NOT NULL,
    "store_email" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEmployee" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "OrderEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_status" "OrderStatus" NOT NULL,
    "service_type" "ServiceType"[],
    "total_amount" DECIMAL(65,30) NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_type" "UserType" NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "car_name" TEXT NOT NULL,
    "car_type" "CarType" NOT NULL,
    "car_color" TEXT NOT NULL,
    "car_model" TEXT NOT NULL,
    "car_year" INTEGER NOT NULL,
    "car_price" DECIMAL(65,30) NOT NULL,
    "car_damage_desc" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_type_id_key" ON "User"("user_type", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employee_type_key" ON "Employee"("employee_type");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_type_user_id_key" ON "Employee"("user_type", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_name_key" ON "Store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_service_type_key" ON "Order"("service_type");

-- CreateIndex
CREATE UNIQUE INDEX "Car_car_name_key" ON "Car"("car_name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_type_user_id_fkey" FOREIGN KEY ("user_type", "user_id") REFERENCES "User"("user_type", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEmployee" ADD CONSTRAINT "OrderEmployee_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEmployee" ADD CONSTRAINT "OrderEmployee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
