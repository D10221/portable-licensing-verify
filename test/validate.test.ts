import verify, { removeSignature, getSignatureValue } from "../src/verify";
import format, { PUBLIC_KEY_START, PUBLIC_KEY_END } from "../src/format";
import {
  XML_WITHOUT_SIGNATURE,
  SIGNATURE_VALUE,
  PUBLIC_KEY,
} from "./sample-data";

describe("Tests", () => {
  const version = versionNo(electronVersion());
  it("works on electron 2.x", () => {
    if (version && version >= 2 && version < 3) {
      // don't run in plain node
      expect(verify(XML_WITHOUT_SIGNATURE, PUBLIC_KEY)).toBe(true);
    }
  });
});

function electronVersion() {
  return process && process.versions && (process.versions as any).electron;
}

function versionNo(version: string) {
  return (
    (version && Number((/(\d+)\.\d+.\d+.(?:.*)/.exec(version) || [])[1])) || NaN
  );
}
