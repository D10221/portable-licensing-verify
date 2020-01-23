import crypto from "crypto";
import format from "./format";
/**
 *
 * @param {string} xmlData 'xml data with signature node'
 * @returns {string} xmlData without signature node
 */
export function removeSignature(xmlData: string): string {
  return xmlData
    .replace(/\<Signature\>.*\<\/Signature\>/, "")
    .split(/\r?\n/)
    .filter(x => x && x.trim())
    .join("")
    .replace(/\s+\</gim, "<");
}
/**
 *
 * @param {string} xmlData 'XML Data with signature TAG'
 * @returns {string} xml value of <Signature/> Tag
 */
export function getSignatureValue(xmlData: string): string | undefined {
  const matches = /\<Signature\>(.*)\<\/Signature\>/gim.exec(xmlData);
  return (matches && Boolean(matches.length) && matches[1]) || undefined;
}
/**
 * verify signature
 * @param {string} xmlData
 * @param {string} publicKey
 * @return {boolean} verified
 */
export default function verify(xmlData: string, publicKey: string): boolean {  
  const verify = crypto.createVerify("RSA-SHA512");
  verify.update(removeSignature(xmlData));
  const signature = getSignatureValue(xmlData);
  if (!signature) throw new Error("No Signature");
  const x = format(publicKey)
  const ok = verify.verify(x, signature, "base64");
  return ok;
}
