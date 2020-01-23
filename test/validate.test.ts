import verify, { removeSignature, getSignatureValue } from "../src/verify";
import format, { PUBLIC_KEY_START, PUBLIC_KEY_END } from "../src/format";
import isElectron from "is-electron";
import {
  XML_WITHOUT_SIGNATURE,
  SIGNATURE_VALUE,
  PUBLIC_KEY,
  SIGNATURE_NODE,
} from "./sample-data";
import { versionNo, electronVersion } from "./electron-version";

const electronSupport = [2];

describe("Validate", () => {
  const version = versionNo(electronVersion());
  it("verify", () => {
    // works on Node & electron 2.x
    if (isElectron() && (!version || electronSupport.indexOf(version) === -1)) {
      throw new Error(`Unexpected Electron version: ${(version || "?")}, Expected [${electronSupport.join(" | ")}]`)
    }
    // defaults: format: pem, 1
    // signature-encoding: kSigEncDER, 
    // data: string,
    // format: 1, 
    // type: undefined, 
    // passphrase: undefined,, 
    // signature: ArrayBuffer,
    // rsaPadding: undefined,
    // pssSaltLength: undefined, 
    // dsaSigEnc: 0 (kSigEncDER) 
    expect(verify(XML_WITHOUT_SIGNATURE + SIGNATURE_NODE, PUBLIC_KEY)).toBe(true);
  });


});
