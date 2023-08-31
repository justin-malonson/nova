import { Config } from "../config";
export class Web3 {
  constructor(private config: Config) {}

  clientVersion(): string {
    return `nova/${this.config.unsafeMode ? "unsafe/" : ""}0.0.3`; // TODO: get version based on commit hash
  }
}
