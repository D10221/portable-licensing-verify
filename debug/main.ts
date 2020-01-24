const cryptos = require("crypto");
const { writeFileSync } = require("fs");
const { PUBLIC_KEY, SIGNATURE, XML } = require("./constants");
const isElectron = require("is-electron");
// stop on entry !, or electron won't
function run() {
  // debugger
  const types = ["pkcs1", "spki", "pkcs8", "sec1", undefined];
  const formats = ["pem", "der", undefined];
  const dsaEncodings = ["der", "ieee-p1363", undefined];
  const sigEncodings = [
    "buffer", // node has this
    "latin1",
    "hex",
    "base64",
    "utf8",
    "ascii",
    "latin1",
    "binary",
    undefined,
  ];
  const algos = ["RSA-SHA512"];
  const results: any = [];
  for (const type of types) {
    for (const f of formats) {
      for (const dsaEncoding of dsaEncodings) {
        for (const sigEncoding of sigEncodings) {
          for (const pemType of ["public", "rsa"]) {
            for (const algo of algos) {
              try {
                const verify = cryptos.createVerify(algo);
                verify.update(XML);
                const key = pemEncode(PUBLIC_KEY, pemType);
                const ok = verify.verify(
                  {
                    key,
                    type, //  type: 'pkcs1' | 'spki' | 'pkcs8' | 'sec1';  // NODE ignores 'type'
                    format: f, // 'pem' | 'der';
                    dsaEncoding, // 'der'||'ieee-p1363'|| ...etc
                  } as any,
                  SIGNATURE,
                  sigEncoding as any,
                );
                if (ok)
                  results.push({
                    type,
                    format: f,
                    dsaEncoding,
                    sigEncoding,
                    pemType,
                    algo,
                  });
              } catch {
                //  results.push({ ok: false, type, f, dsaEncoding, sigEncoding, pemType, algo })
              }
            }
          }
        }
      }
    }
  }
  return results;
}

const EOL = "\n";
function pemEncode(key: string, mode: string) {
  switch (mode) {
    case "public":
      return (
        "-----BEGIN PUBLIC KEY-----" +
        EOL +
        key +
        EOL +
        "-----END PUBLIC KEY-----"
      );
    case "rsa":
      return (
        "-----BEGIN RSA PUBLIC KEY-----" +
        EOL +
        key +
        EOL +
        "-----END RSA PUBLIC KEY-----"
      );
    default:
      throw new Error("Invalid mode: " + mode + " expected 'public'");
  }
}

const results = run();

if (isElectron())
  writeFileSync("./results.electron.json", JSON.stringify(results));
else writeFileSync("./results.node.json", JSON.stringify(results));

process.exit();
