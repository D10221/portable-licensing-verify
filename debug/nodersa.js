const fmt = require("./fmt");
const pemEncode = require("./pem");
const { PUBLIC_KEY, XML, SIGNATURE } = require("./constants");
/**
 const key = new NodeRSA([keyData, [format]], [options]);

    keyData — {string|buffer|object} — parameters for generating key or the key in one of supported formats.
    format — {string} — format for importing key. See more details about formats in Export/Import section.
    options — {object} — additional settings.

 */
const NodeRSA = require("node-rsa");
/** */
const formats = [
  "components",
  "components-public",
  "components-public-der",
  "components-public-pem",
  "pkcs8-public-pem",
  "pkcs1",
  "pkcs1-der",
  "pkcs1-pem",
  "pkcs1-public",
  "pkcs1-public-der",
  "pkcs1-public-pem",
  "pkcs8",
  "pkcs8-der",
  "pkcs8-pem",
  "pkcs8-public",
  "pkcs8-public-der",
  "pkcs8-public-pem",
  "public",
  undefined,
];

const schemes = [
  "pkcs1",
  "pss",
  "pkcs1-ripemd160",
  "pkcs1-md4",
  "pkcs1-md5",
  "pkcs1-sha",
  "pkcs1-sha1",
  "pkcs1-sha224",
  "pkcs1-sha256",
  "pkcs1-sha384",
  "pkcs1-sha512",
  "pss-ripemd160",
  "pss-md4",
  "pss-md5",
  "pss-sha",
  "pss-sha1",
  "pss-sha224",
  "pss-sha256",
  "pss-sha384",
  "pss-sha512",
];
function getKey() {
  for (const f of formats) {
    for (const signingScheme of schemes)
      for (const pem of ["public", "rsa", undefined])
        for (const fo of [true, false])
          for (const enc of ["base64", "utf8", "ascii", "none", undefined]) {
            try {
              let k = PUBLIC_KEY;
              k = fo ? fmt(k) : k;
              k = pemEncode(k, pem);
              k = enc === "none" ? k : Buffer.from(k, enc);
              return new NodeRSA(k, f, { signingScheme });
            } catch (e) {
              /**@type {string} */
              let message = (e && e.message) || "";
              console.log(
                "%s\t%s\t%s\t%s\t%s\t'%s'",
                enc || "?",
                fo || "?",
                pem || "?",
                f || "?",
                signingScheme || "",
                message.substr(0, 50),
              );
            }
          }
  }
}

const key = getKey();
if (!key) {
  console.log("NO KEY");
  process.exit();
} else {
  console.log("Found!");
}
const ok = key.verify(XML, SIGNATURE);
console.log(ok);
