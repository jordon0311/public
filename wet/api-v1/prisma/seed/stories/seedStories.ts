import type { PrismaClient, Story, User } from "@prisma/client";

const stories = [
  {
    title: "The tale of the one legged Dog",
  },
  {
    title: "Sperm City",
  },
  {
    title: "My day off with Jeff",
  },
];

const seed = async (
  prismaClient: PrismaClient,
  users: User[],
): Promise<Story[]> => {
  console.log("Seeding stories");
  const dbStories = await Promise.all(
    users.map(async (user) => {
      return Promise.all(
        stories.map(async (story) => {
          const dbStory = await prismaClient.story.create({
            data: {
              StoryUser: { create: { userId: user.id } },
              title: story.title,
            },
          });
          return dbStory;
        }),
      );
    }),
  );

  return dbStories.flat();
};

export default seed;
