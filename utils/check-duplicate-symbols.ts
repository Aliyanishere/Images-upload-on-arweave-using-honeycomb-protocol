import { readFileSync } from "fs";
import { getConfig } from "../config";

export const getAllSymbols = async () => {
  try {
    const { dir } = getConfig();
    const symbols = [];
    for (const file of dir.files) {
      const metadata = await JSON.parse(readFileSync(file, "utf-8"));
      if (metadata.symbol !== undefined) {
        symbols.push({ name: metadata.name, symbol: metadata.symbol });
      }
    }
    return symbols;
  } catch (e) {
    console.error(e);
    return [];
  }
};

// Function to check for duplicate symbols in all files
export async function checkDuplicateSymbolsInAllFiles() {
  const allSymbols = await getAllSymbols();
  const hasDuplicateSymbols = allSymbols?.some((symbol, index) => {
    const hasDuplicate =
      allSymbols.findIndex((s) => s.symbol === symbol.symbol) !== index;
    if (hasDuplicate) {
      console.log(
        `Found duplicate symbol: ${hasDuplicate}. Found in the following files: ${allSymbols
          ?.filter((s) => s.symbol === symbol.symbol)
          .map((s) => s.name)}`
      );
      return true;
    } else {
      return false;
    }
  });
  return hasDuplicateSymbols;
}
(async () => {
  const hasDuplicateSymbols = await checkDuplicateSymbolsInAllFiles();
  console.log(`Has duplicate symbols: ${hasDuplicateSymbols}`);
})();
