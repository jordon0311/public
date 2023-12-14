import { Opinion as DBOpinion } from "@prisma/client";

import { Opinion } from "#common/types/enums/opinion";

export const dbToDomain = {
  opinion: (source: DBOpinion): Opinion => {
    switch (source) {
      case DBOpinion.Like:
        return Opinion.LIKE;
      case DBOpinion.Dislike:
        return Opinion.DISLIKE;
      case DBOpinion.None:
        return Opinion.NONE;
    }
  },
};
