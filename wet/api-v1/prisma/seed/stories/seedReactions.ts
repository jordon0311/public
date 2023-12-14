import {
  Opinion,
  type PrismaClient,
  type Story,
  type User,
} from "@prisma/client";

const seed = async (
  prismaClient: PrismaClient,
  stories: Story[],
  users: User[],
): Promise<void> => {
  console.log("Seeding reactions");
  await Promise.all(
    stories.map(async (story) => {
      await Promise.all(
        users.map(async (user, index) => {
          const opinion = index % 2 === 0 ? Opinion.Like : Opinion.Dislike;
          await prismaClient.storyReaction.create({
            data: {
              opinion,
              storyId: story.id,
              userId: user.id,
            },
          });
        }),
      );
    }),
  );
};

export default seed;
