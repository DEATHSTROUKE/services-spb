-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'worker');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "type" "UserType" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkersFields" (
    "id" UUID NOT NULL,
    "job" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "subway" TEXT,
    "usersId" UUID NOT NULL,

    CONSTRAINT "WorkersFields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "clientId" UUID NOT NULL,
    "workerId" UUID NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WorkersFields_usersId_key" ON "WorkersFields"("usersId");

-- AddForeignKey
ALTER TABLE "WorkersFields" ADD CONSTRAINT "WorkersFields_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "WorkersFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
