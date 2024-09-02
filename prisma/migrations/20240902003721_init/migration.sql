/*
  Warnings:

  - You are about to drop the column `category` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `categoryPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `contactPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `contacts` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `emailPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endDatePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `endTimePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `eventDetailMarkdownId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `eventNamePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `locationPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `mediaPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfTickets` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfTicketsPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `pricePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionOn` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startDatePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `startTimePromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userAnswerId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddressPromptId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userAccount]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userAccount` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAccount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_chat_id_fkey";

-- DropIndex
DROP INDEX "User_chat_id_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "category",
DROP COLUMN "categoryPromptId",
DROP COLUMN "chat_id",
DROP COLUMN "contactPromptId",
DROP COLUMN "contacts",
DROP COLUMN "description",
DROP COLUMN "descriptionPromptId",
DROP COLUMN "email",
DROP COLUMN "emailPromptId",
DROP COLUMN "endDate",
DROP COLUMN "endDatePromptId",
DROP COLUMN "endTime",
DROP COLUMN "endTimePromptId",
DROP COLUMN "eventDetailMarkdownId",
DROP COLUMN "eventName",
DROP COLUMN "eventNamePromptId",
DROP COLUMN "location",
DROP COLUMN "locationPromptId",
DROP COLUMN "media",
DROP COLUMN "mediaPromptId",
DROP COLUMN "numberOfTickets",
DROP COLUMN "numberOfTicketsPromptId",
DROP COLUMN "price",
DROP COLUMN "pricePromptId",
DROP COLUMN "sessionOn",
DROP COLUMN "startDate",
DROP COLUMN "startDatePromptId",
DROP COLUMN "startTime",
DROP COLUMN "startTimePromptId",
DROP COLUMN "userAnswerId",
DROP COLUMN "walletAddress",
DROP COLUMN "walletAddressPromptId",
ADD COLUMN     "departureCity" TEXT,
ADD COLUMN     "departureCityCode" TEXT,
ADD COLUMN     "departureDate" TEXT,
ADD COLUMN     "destinationCity" TEXT,
ADD COLUMN     "destinationCityCode" TEXT,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'english',
ADD COLUMN     "returnDate" TEXT,
ADD COLUMN     "userAccount" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chat_id",
DROP COLUMN "username",
ADD COLUMN     "userAccount" TEXT NOT NULL;

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "SearchResults" (
    "id" SERIAL NOT NULL,
    "searchResults" TEXT NOT NULL,
    "userAccount" TEXT NOT NULL,

    CONSTRAINT "SearchResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSession" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "LastName" TEXT,
    "email" TEXT,
    "nationality" TEXT,
    "gender" TEXT,
    "passPortNumber" TEXT,
    "DOB" TEXT,
    "searchResultId" TEXT,
    "language" TEXT NOT NULL DEFAULT 'english',
    "userAccount" TEXT NOT NULL,
    "ref" TEXT,
    "amount" TEXT,
    "recipient" TEXT,
    "message" TEXT,
    "deeplink" TEXT,

    CONSTRAINT "BookingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userAccount_key" ON "User"("userAccount");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userAccount_fkey" FOREIGN KEY ("userAccount") REFERENCES "User"("userAccount") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchResults" ADD CONSTRAINT "SearchResults_userAccount_fkey" FOREIGN KEY ("userAccount") REFERENCES "User"("userAccount") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSession" ADD CONSTRAINT "BookingSession_userAccount_fkey" FOREIGN KEY ("userAccount") REFERENCES "User"("userAccount") ON DELETE CASCADE ON UPDATE CASCADE;
