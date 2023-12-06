import { Prisma } from "@prisma/client";

export const typesafeUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    UserAuthentication: true,
  },
});

export type DBUser = Prisma.UserGetPayload<typeof typesafeUser>;
