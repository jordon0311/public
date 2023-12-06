import { wetDBClient } from "../../src/lib/wetDBClient";
import seedUsers from "./users/seedUsers";

const seed = async () => {
  // seed the users
  await seedUsers(wetDBClient);
};

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
