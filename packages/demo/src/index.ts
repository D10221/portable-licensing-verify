import verify from "@d10221/portable-licensing-verify";
import { readFileSync } from "fs";
import { join, isAbsolute } from "path";
import minimist from "minimist";
import { PUBLIC_KEY } from "./constants";
import isElectron from "is-electron";
import xml from "xml-js";

const _isElectron = isElectron();

const { _: args, ...vars } = minimist(
  process.argv.slice((!_isElectron && 2) || 0),
); // dont slice(2) , if electron
const publicKey = vars.publicKey || process.env.PUBLIC_KEY || PUBLIC_KEY;
const fileName = args[0] || "license.xml";
console.log("Verfying signature: '%s'", fileName);
const filePath = isAbsolute(fileName)
  ? fileName
  : join(process.cwd(), fileName);
const xmlSrc = readFileSync(filePath, "utf-8");

let verified = false;
try {
  verified = verify(xmlSrc, publicKey);
} catch (error) {
  console.error(error);
}
console.log("'%s' Signature verified: %s", fileName, verified);

if (verified) {
  let license: any;
  try {
    const decoded = xml.xml2js(xmlSrc, { compact: true }) as any;
    license = decoded.License;
  } catch (error) {
    console.error(error);
  }
  console.log("exp: %s", license && license.Expiration && license.Expiration._text);
}
