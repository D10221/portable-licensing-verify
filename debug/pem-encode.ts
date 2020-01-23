import { writeFileSync } from "fs";
import { PUBLIC_KEY, SIGNATURE_VALUE, XML_WITHOUT_SIGNATURE } from "../test/sample-data";
import pemEncode from "../src/format";
writeFileSync("./signature.sign", SIGNATURE_VALUE);
writeFileSync("./signed.xml", XML_WITHOUT_SIGNATURE);
writeFileSync("./public.pem", pemEncode(PUBLIC_KEY));
writeFileSync("./public.nopad.pem", pemEncode(PUBLIC_KEY, true /*nopad*/));

