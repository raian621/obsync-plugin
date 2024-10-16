import { md5 } from "js-md5";
import { Vault } from "obsidian";

/**
 * Calculate the md5 sum of a file in the vault. This md5 sum is used as an
 * etag, which enables efficient caching of HTTP requests.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
 *
 * @param {string} filepath
 * @param {Vault} vault
 * @returns Promise<string | null>
 */
export async function getFileEtag(
  filepath: string,
  vault: Vault
): Promise<string | null> {
  const file = vault.getFileByPath(filepath);
  if (file === null) {
    return null;
  }
  const data = await vault.read(file);
  const etag = md5.hex(data);
  return etag;
}
