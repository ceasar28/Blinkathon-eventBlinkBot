-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "chat_id" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionOn" BOOLEAN NOT NULL DEFAULT false,
    "eventName" TEXT,
    "description" TEXT,
    "location" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "contacts" TEXT,
    "email" TEXT,
    "price" TEXT,
    "category" TEXT,
    "numberOfTickets" TEXT,
    "media" TEXT,
    "walletAddress" TEXT,
    "eventNamePromptId" TEXT,
    "userAnswerId" TEXT,
    "descriptionPromptId" TEXT,
    "locationPromptId" TEXT,
    "startDatePromptId" TEXT,
    "startTimePromptId" TEXT,
    "endDatePromptId" TEXT,
    "endTimePromptId" TEXT,
    "contactPromptId" TEXT,
    "emailPromptId" TEXT,
    "pricePromptId" TEXT,
    "categoryPromptId" TEXT,
    "numberOfTicketsPromptId" TEXT,
    "mediaPromptId" TEXT,
    "walletAddressPromptId" TEXT,
    "eventDetailMarkdownId" BIGINT,
    "chat_id" BIGINT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT,
    "description" TEXT,
    "location" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "contacts" TEXT,
    "email" TEXT,
    "price" TEXT,
    "category" TEXT,
    "numberOfTickets" TEXT,
    "media" TEXT,
    "walletAddress" TEXT,
    "eventDetailMarkdownId" BIGINT,
    "chat_id" BIGINT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chat_id_key" ON "User"("chat_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "User"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
