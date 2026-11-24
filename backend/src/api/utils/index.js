import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// raiz del proyecto backend 
export const __dirname = path.resolve(currentDir, "../../..");
export const join = path.join;
