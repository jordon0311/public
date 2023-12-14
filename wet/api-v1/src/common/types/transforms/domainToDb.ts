import { Opinion as DBOpinion } from "@prisma/client";

import { Opinion } from "#common/types/enums/opinion";

export const domainToDb = {
  opinion: (source: Opinion): DBOpinion => {
    switch (source) {
      case Opinion.LIKE:
        return DBOpinion.Like;
      case Opinion.DISLIKE:
        return DBOpinion.Dislike;
      case Opinion.NONE:
        return DBOpinion.None;
    }
  },
};
