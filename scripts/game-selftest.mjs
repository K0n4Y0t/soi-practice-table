import { runSelfTest } from "../src/game/selftest.ts";

const errors = runSelfTest();
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("game selftest ok");
