import verify from "../build";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import isElectron from "is-electron";
import xml from "xml-js";

const PUBLIC_KEY =
`MIIBKjCB4wYHKoZIzj0CATCB1wIBATAsBgcqhkjOPQEBAiEA/////wAAAAEAAAAAAAAAAAAAAAD///////////////8wWwQg/////wAAAAEAAAAAAAAAAAAAAAD///////////////wEIFrGNdiqOpPns+u9VXaYhrxlHQawzFOw9jvOPD4n0mBLAxUAxJ02CIbnBJNqZnjhE50mt4GffpAEIQNrF9Hy4SxCR/i85uVjpEDydwN9gS3rM6D0oTlF2JjClgIhAP////8AAAAA//////////+85vqtpxeehPO5ysL8YyVRAgEBA0IABNVLQ1xKY80BFMgGXec++Vw7n8vvNrq32PaHuBiYMm0PEj2JoB7qSSWhfgcjxNVJsxqJ6gDQVWgl0r7LH4dr0KU=`;

const is_electron = isElectron();
if (is_electron) {
  console.log("is electron");
}

const publicKey = PUBLIC_KEY;

const fileName = "license.xml";
console.log("Filename: '%s'", fileName);

const cwd = process.env.CWD || (is_electron
  ? dirname(require("electron").app.getAppPath())
  : process.cwd());

console.log("cwd: ", cwd);

const file_path = join(cwd, fileName);
console.log("filePath: %s", file_path);
const xmlSrc = readFileSync(file_path, "utf-8");

let verified = false;
try {
  verified = verify(xmlSrc, publicKey);
} catch (error) {
  console.error(error);
}
console.log("'%s' Signature verified: %s", fileName, verified);

if (verified) {
  let license;
  try {
    const decoded = xml.xml2js(xmlSrc, { compact: true });
    license = decoded.License;
  } catch (error) {
    console.error(error);
  }
  console.log("exp: %s", license && license.Expiration && license.Expiration._text);
}
