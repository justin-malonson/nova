import {
  BitVectorType,
  ByteListType,
  ContainerType,
  VectorCompositeType,
} from "@chainsafe/ssz";
import * as primitiveSsz from "./primitive/sszTypes";
const { Address, Bytes32, Bytes96, UintBn256 } = primitiveSsz;

// constants used in several modules
// =================================

export const MAX_CONTRACT_SIZE = 24576;
export const MAX_BYTE_ARRAY_SIZE = 64000;
export const MEMPOOLS_SUBNET_COUNT = 64;
export const MAX_OPS_PER_REQUEST = 256;
export const MAX_MEMPOOLS_PER_BUNDLER = 20;
export const GOSSIP_MAX_SIZE = 1048576;
export const TTFB_TIMEOUT = 5;
export const RESP_TIMEOUT = 10;

// Types used by main gossip topics
// =================================

export const Metadata = new ContainerType(
  {
    seqNumber: primitiveSsz.UintBn64,
    mempoolnets: new BitVectorType(MEMPOOLS_SUBNET_COUNT),
  },
  { typeName: "Metadata", jsonCase: "eth2" }
);

export const UserOp = new ContainerType({
  sender: Address,
  nonce: primitiveSsz.UintBn256,
  initCode: new ByteListType(MAX_CONTRACT_SIZE),
  callData: new ByteListType(MAX_BYTE_ARRAY_SIZE),
  callGasLimit: UintBn256,
  verificationGasLimit: UintBn256,
  preVerificationGasLimit: UintBn256,
  maxFeePerGas: UintBn256,
  paymasterAndData: new ByteListType(MAX_BYTE_ARRAY_SIZE),
  signature: Bytes96,
});

// ReqResp types
// =============

export const Status = new ContainerType(
  {
    supportedMempools: new VectorCompositeType(
      Bytes32,
      MAX_MEMPOOLS_PER_BUNDLER
    ),
  },
  { typeName: "Status", jsonCase: "eth2" }
);

export const Goodbye = primitiveSsz.UintBn64;

export const Ping = primitiveSsz.UintBn64;
