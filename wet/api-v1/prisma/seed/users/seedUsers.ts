import { PrismaClient } from "@prisma/client";

const users = [
  {
    firstName: "jake",
    lastName: "zegil",
    title: "engineering",
  },
  {
    firstName: "jordon",
    lastName: "waters",
    title: "engineering",
  },
  {
    firstName: "aiden",
    lastName: "zegil",
    title: "engineering",
  },
];

const seed = async (prismaClient: PrismaClient): Promise<void> => {
  await Promise.all(
    users.map((user) => {
      const username = `${user.firstName}_${user.lastName}`;
      const email = `${user.firstName}@wetpages.com`;
      return prismaClient.user.upsert({
        where: {
          username,
        },
        create: {
          username,
          email,
        },
        update: {
          username,
          email,
        },
      });
    }),
  );
};

export default seed;
