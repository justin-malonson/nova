import { Eth } from "executor/lib/modules/eth";
import { GetGasPriceResponse } from "types/lib/api/interfaces";
import { Nova } from "executor/lib/modules";
import { RpcMethodValidator } from "../utils/RpcMethodValidator";
import { SendUserOperationGasArgs } from "../dto/SendUserOperation.dto";

export class NovaAPI {
  constructor(private ethModule: Eth, private novaModule: Nova) {}

  /**
   * Validates UserOp. If the UserOp (sender + entryPoint + nonce) match the existing UserOp in mempool,
   * validates if new UserOp can replace the old one (gas fees must be higher by at least 10%)
   * @param userOp same as eth_sendUserOperation
   * @param entryPoint Entry Point
   * @returns
   */
  @RpcMethodValidator(SendUserOperationGasArgs)
  async validateUserOp(args: SendUserOperationGasArgs): Promise<boolean> {
    return await this.ethModule.validateUserOp(args);
  }

  async getGasPrice(): Promise<GetGasPriceResponse> {
    return await this.novaModule.getGasPrice();
  }
}
