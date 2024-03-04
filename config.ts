import { Honeycomb, keypairIdentity } from "@honeycomb-protocol/hive-control";
import { Connection, Keypair } from "@solana/web3.js";
import { readdirSync } from "fs";

export const getConfig = (dirName: string | undefined = undefined) => {
  /** HONEYCOMB CONFIG */
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "processed"
  );
  const payer = Keypair.fromSecretKey(Uint8Array.from(require("./key.json")));
  const honeycomb = new Honeycomb(connection);
  honeycomb.use(keypairIdentity(payer));

  /** PROCESSOR */
  if (dirName) {
    return {
      honeycomb,
      dir: {
        dir: `./resources/${dirName}/`,
        files: readdirSync(`./resources/${dirName}`),
      },
    };
  }

  const mainDir = readdirSync("./metadata");
  const dir = mainDir.flatMap((e) => {
    return readdirSync(`./metadata/${e}`).map((f) => `./metadata/${e}/${f}`);
  });

  return {
    honeycomb,
    dir: {
      dir: `./metadata/`,
      files: dir,
    },
  };
};
