import {
  Honeycomb,
  getBytesFromHoneycombFiles,
  toHoneycombFile,
} from "@honeycomb-protocol/hive-control";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";

import { getConfig } from "./config";

export interface METADATA {
  file: string;
  dir: string;
  metadata: {
    name: string;
    uri: string;
    symbol: string;
  };
}

export type MATERIAL = {
  name: string;
  qty: number;
};

export interface CRAFT_MATERIAL {
  output: MATERIAL;
  inputs: MATERIAL[];
}

export const uploadFile = async (
  data: METADATA,
  honeycomb: Honeycomb,
  bundlr: any
) => {
  try {
    // CHECK IF THE FILE IS ALREADY UPLOADED
    const hFile = toHoneycombFile(readFileSync(data.file), data.metadata.name, {
      extension: data.file.split("/").at(-1)?.split(".").at(-1),
    });

    console.log("Uploading", data.file);

    /** FUNDING */
    const cost = await honeycomb
      .storage()
      .getUploadPriceForBytes(getBytesFromHoneycombFiles(hFile));
    await bundlr.fund(cost.basisPoints.toNumber());

    /** UPLOADING THE IMAGE */
    const uploadImage = await honeycomb.storage().uploadAll([hFile]);
    data.metadata.uri = uploadImage[0] + "?ext=" + hFile.extension;

    try {
      readdirSync(`./resources/${data.dir}`); // check if the directory exists
    } catch (e) {
      mkdirSync(`./resources/${data.dir}`); // create the directory if it doesn't exist
    }

    writeFileSync(
      `./resources/${data.dir}/` +
        data.metadata.name.toLocaleLowerCase().replace(" ", "_") +
        ".json", // save the metadata to a file
      JSON.stringify(data.metadata) // save the metadata to a file
    );
  } catch (e) {
    console.error(e, data.metadata.name);
  }
};

export const uploadMetadataAndFiles = async (
  files: METADATA[],
  honeycomb: Honeycomb
) => {
  const bundlr = await honeycomb.storage().bundlr();
  const batchSize = 10;
  const batches = Math.ceil(files.length / batchSize);

  for (let i = 0; i < batches; i++) {
    const batch = files.slice(i * batchSize, (i + 1) * batchSize);
    await Promise.all(batch.map((e) => uploadFile(e, honeycomb, bundlr)));
  }
};

const prepareMetadata = async () => {
  const { honeycomb, dir } = getConfig();

  const data: METADATA[] = [];
  for (const file of dir.files) {
    const metadata = JSON.parse(readFileSync(file, "utf-8"));
    data.push({
      metadata,
      dir: file.split("/")[2],
      file: metadata.uri,
    });
  }
  await uploadMetadataAndFiles(data, honeycomb);
};

prepareMetadata();
