import { wetDBClient } from "../../src/lib/wetDBClient";
import seedChapters from "./stories/seedChapters";
import seedReactions from "./stories/seedReactions";
import seedStories from "./stories/seedStories";
import seedUsers from "./users/seedUsers";

const seed = async (): Promise<void> => {
  const users = await seedUsers(wetDBClient);
  const stories = await seedStories(wetDBClient, users);
  await seedChapters(wetDBClient, stories);
  await seedReactions(wetDBClient, stories, users);
};

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
