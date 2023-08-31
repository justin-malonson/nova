#!/usr/bin/env node

// MUST import first to apply preset from args
import { YargsError } from "./util";
import { getLyfeblocNetworkBundlerCli, yarg } from "./cli";

const bundler = getLyfeblocNetworkBundlerCli();

void bundler
  .fail((msg, err) => {
    if (msg) {
      if (msg.includes("Not enough non-option arguments")) {
        yarg.showHelp();
        // eslint-disable-next-line no-console
        console.log("\n");
      }
    }

    const errorMessage =
      err !== undefined
        ? err instanceof YargsError
          ? err.message
          : err.stack
        : msg || "Unknown Error";

    // eslint-disable-next-line no-console
    console.error(` ✖ ${errorMessage}\n`);
    process.exit(1);
  })
  .parse();
