/*
  Warnings:

  - A unique constraint covering the columns `[chapterIndex,storyId]` on the table `chapter_story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapterIndex` to the `chapter_story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chapter_story" ADD COLUMN     "chapterIndex" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chapter_story_chapterIndex_storyId_key" ON "chapter_story"("chapterIndex", "storyId");
