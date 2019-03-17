import verify , { removeSignature, getSignatureValue }from "../src/verify";
import format, { PUBLIC_KEY_START, PUBLIC_KEY_END } from "../src/format";
import { XML_WITHOUT_SIGNATURE, SIGNATURE_VALUE, PUBLIC_KEY  } from "./sample-data";
import { readFileSync } from "fs";
import { join } from "path";

let xml: string;
beforeAll(()=>{
    xml = readFileSync(join(__dirname, "license.xml"), "utf-8");
})

describe("Tests", () => {
    it("Removes Signature", () => {
        expect(removeSignature(xml)).toBe(XML_WITHOUT_SIGNATURE);
    })
    it("extracts signature", () => {
        expect(getSignatureValue(xml)).toBe(SIGNATURE_VALUE);
    })
    it("formats: public", () => {
        var x = format("hello");
        expect(x).toBe(
            `${PUBLIC_KEY_START}
hello
${PUBLIC_KEY_END}
`);
    })
    it("formats & 64 char per line", () => {
        var x = format(
            "0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF"
        );
        const expected =
            "-----BEGIN PUBLIC KEY-----" + "\n" +
            "0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF" + "\n" +
            "0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF0123456789ABCEDF" + "\n" +
            "-----END PUBLIC KEY-----" + "\n";
        expect(x).toBe(expected);
    })
    it("validates", () => {
        expect(verify(xml, PUBLIC_KEY)).toBe(true);
    });
})