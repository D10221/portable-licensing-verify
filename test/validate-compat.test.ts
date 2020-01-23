import format from "../src/format";
import { PUBLIC_KEY, SIGNATURE_VALUE, XML_WITHOUT_SIGNATURE } from "./sample-data";

describe("compat", () => {
    it("works", async () => {
        const crypto = await import("crypto");
        const verify = crypto.createVerify("RSA-SHA512");
        verify.update(XML_WITHOUT_SIGNATURE);
        const signature = SIGNATURE_VALUE;
        if (!signature) throw new Error("No Signature");
        const data = {
            key: format(PUBLIC_KEY),
            // NODE ignores 'type'
            type: "spki",//  type: 'pkcs1' | 'spki' | 'pkcs8' | 'sec1'; 
            format: "pem", // 'pem' | 'der';
            dsaEncoding: "der" // 'der'||'ieee-p1363'||
        } as any
        const ok = verify.verify(
            data,
            signature,
            "base64");
        expect(ok).toBe(true);
    })
});

