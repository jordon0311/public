/*
  Warnings:

  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChapterStory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('Firebase');

-- CreateEnum
CREATE TYPE "Opinion" AS ENUM ('Dislike', 'Like', 'None');

-- DropForeignKey
ALTER TABLE "ChapterStory" DROP CONSTRAINT "ChapterStory_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "ChapterStory" DROP CONSTRAINT "ChapterStory_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryUser" DROP CONSTRAINT "StoryUser_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryUser" DROP CONSTRAINT "StoryUser_userId_fkey";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "ChapterStory";

-- DropTable
DROP TABLE "Story";

-- DropTable
DROP TABLE "StoryUser";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_story" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "chapter_story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_reaction" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "opinion" "Opinion" NOT NULL,

    CONSTRAINT "story_reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_user" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "story_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_authentication" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_authentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chapter_story_chapterId_key" ON "chapter_story"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "story_reaction_storyId_userId_key" ON "story_reaction"("storyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "story_user_storyId_key" ON "story_user"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentication_externalId_provider_key" ON "user_authentication"("externalId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentication_userId_provider_key" ON "user_authentication"("userId", "provider");

-- AddForeignKey
ALTER TABLE "chapter_story" ADD CONSTRAINT "chapter_story_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_story" ADD CONSTRAINT "chapter_story_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_reaction" ADD CONSTRAINT "story_reaction_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_reaction" ADD CONSTRAINT "story_reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_user" ADD CONSTRAINT "story_user_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_user" ADD CONSTRAINT "story_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentication" ADD CONSTRAINT "user_authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
