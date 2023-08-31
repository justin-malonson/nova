import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { cmds } from "./cmds";
import { globalOptions } from "./options";
import { registerCommandToYargs } from "./util";
import { getVersionData } from "./util/version.js";

const { version } = getVersionData();
const topBanner = `lyfebloc-network-bundler: TypeScript Implementation of the ERC 4337 bundler client.
  * Version: ${version}
  * by Lyfebloc Network, 2018-2023`;
const bottomBanner = `📖 For more information, check the CLI reference:

✍️ Give feedback and report issues on GitHub:
  * https://https://github.com/lyfebloc-network/nova`;

export const yarg = yargs(
  (hideBin as (args: string[]) => string[])(process.argv)
);

/**
 * Common factory for running the CLI and running integration tests
 * The CLI must actually be executed in a different script
 */
export function getLyfeblocNetworkBundlerCli(): yargs.Argv {
  const bundler = yarg
    .parserConfiguration({
      // As of yargs v16.1.0 dot-notation breaks strictOptions()
      // Manually processing options is typesafe tho more verbose
      "dot-notation": false,
    })
    .options(globalOptions)
    // blank scriptName so that help text doesn't display the cli name before each command
    .scriptName("")
    .demandCommand(1)
    // Control show help behaviour below on .fail()
    .showHelpOnFail(false)
    .usage(topBanner)
    .epilogue(bottomBanner)
    .version(topBanner)
    .alias("h", "help")
    .alias("v", "version")
    .recommendCommands();

  // yargs.command and all ./cmds
  for (const cmd of cmds) {
    registerCommandToYargs(bundler, cmd);
  }

  // throw an error if we see an unrecognized cmd
  bundler.recommendCommands().strict();

  return bundler;
}
