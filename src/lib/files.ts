import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";

export function publicFileExists(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}
