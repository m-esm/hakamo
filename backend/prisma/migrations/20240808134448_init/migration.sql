-- CreateEnum
CREATE TYPE "DatasourceType" AS ENUM ('POSTGRES', 'MYSQL', 'MONGODB', 'MSSQL');

-- CreateTable
CREATE TABLE "Datasource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "connectionString" TEXT,
    "type" "DatasourceType" NOT NULL,

    CONSTRAINT "Datasource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "temporaryPassword" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
