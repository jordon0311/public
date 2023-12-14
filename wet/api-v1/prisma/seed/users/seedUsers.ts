import type { PrismaClient, User } from "@prisma/client";

const users = [
  {
    firebaseId: "fake-firebase-1",
    firstName: "papa",
    lastName: "bigBalls",
    title: "engineering",
  },
  {
    firebaseId: "fake-firebase-2",
    firstName: "jojo",
    lastName: "johnson",
    title: "engineering",
  },
  {
    firebaseId: "fake-firebase-3",
    firstName: "dorito",
    lastName: "goodbody",
    title: "engineering",
  },
  {
    firebaseId: "fake-firebase-4",
    firstName: "dr",
    lastName: "bruh",
    title: "engineering",
  },
];

const seed = async (prismaClient: PrismaClient): Promise<User[]> => {
  console.log("Seeding users");
  const dbUsers = await Promise.all(
    users.map(async (user) => {
      const username = `${user.firstName}_${user.lastName}`;
      const email = `${user.firstName}@wetpages.com`;
      return prismaClient.user.upsert({
        create: {
          email,
          firebaseId: user.firebaseId,
          username,
        },
        update: {
          email,
          firebaseId: user.firebaseId,
          username,
        },
        where: {
          username,
        },
      });
    }),
  );

  return dbUsers;
};

export default seed;
