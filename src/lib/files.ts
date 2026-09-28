import "server-only";

// filled in next.config.ts at build time, the Workers runtime cannot read public/
const publicFiles = new Set<string>(JSON.parse(process.env.PUBLIC_FILES ?? "[]"));

export function publicFileExists(publicPath: string): boolean {
  return publicFiles.has(publicPath.startsWith("/") ? publicPath : `/${publicPath}`);
}
