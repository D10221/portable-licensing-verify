
const EOL = "\n";
const fmt = (data) => {
    const out = [];
    let line = "";
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (count < 64) {
            ++count;
            line += data[i];
        }
        else {
            count = 0;
            out.push(line);
            line = data[i];
        }
    }
    if (line != "") {
        out.push(line);
    }
    return out.join("\n");
};

function pemEncode(key, mode = "public") {
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

const PUBLIC_KEY =
    `MIIBKjCB4wYHKoZIzj0CATCB1wIBATAsBgcqhkjOPQEBAiEA/////wAAAAEAAAAAAAAAAAAAAAD///////////////8wWwQg/////wAAAAEAAAAAAAAAAAAAAAD///////////////wEIFrGNdiqOpPns+u9VXaYhrxlHQawzFOw9jvOPD4n0mBLAxUAxJ02CIbnBJNqZnjhE50mt4GffpAEIQNrF9Hy4SxCR/i85uVjpEDydwN9gS3rM6D0oTlF2JjClgIhAP////8AAAAA//////////+85vqtpxeehPO5ysL8YyVRAgEBA0IABNVLQ1xKY80BFMgGXec++Vw7n8vvNrq32PaHuBiYMm0PEj2JoB7qSSWhfgcjxNVJsxqJ6gDQVWgl0r7LH4dr0KU=`;
const XML = `<License><Id>77d4c193-6088-4c64-9663-ed7398ae8c1a</Id><Type>Trial</Type><Expiration>Sun, 31 Dec 1899 23:00:00 GMT</Expiration><Quantity>1</Quantity><Customer><Name>John Doe</Name><Email>john@doe.tld</Email></Customer><LicenseAttributes /><ProductFeatures /></License>`;
const SIGNATURE = 'MEUCIQCCEDAldOZHHIKvYZRDdzUP4V51y23d6deeK5jIFy27GQIgDz2CndjBh4Vb8tiC3FGQ6fn3GKt8d/P5+luJH0cWv+I='

/**
 const key = new NodeRSA([keyData, [format]], [options]);

    keyData — {string|buffer|object} — parameters for generating key or the key in one of supported formats.
    format — {string} — format for importing key. See more details about formats in Export/Import section.
    options — {object} — additional settings.

 */
const NodeRSA = require('node-rsa');
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
    "public"
]
const keys = [
    PUBLIC_KEY,
    Buffer.from(PUBLIC_KEY, 'base64'),
    fmt(PUBLIC_KEY),
    pemEncode(fmt(PUBLIC_KEY), "public"),
    Buffer.from(PUBLIC_KEY, 'utf8'),
    Buffer.from(fmt(PUBLIC_KEY), 'utf8'),
    Buffer.from(pemEncode(PUBLIC_KEY), 'utf8'),
    Buffer.from(pemEncode(fmt(PUBLIC_KEY)), 'utf8'),
]
const schemes = [
    'pkcs1', 'pss',
    'pkcs1-ripemd160',
    , 'pkcs1-md4', 'pkcs1-md5'
    , 'pkcs1-sha', 'pkcs1-sha1'
    , 'pkcs1-sha224', 'pkcs1-sha256', 'pkcs1-sha384', 'pkcs1-sha512'
    , 'pss-ripemd160'
    , 'pss-md4', 'pss-md5'
    , 'pss-sha', 'pss-sha1'
    , 'pss-sha224', 'pss-sha256', 'pss-sha384', 'pss-sha512'
]
function getKey() {
    for (const f of formats) {
        for (const key of keys) {
            for (const signingScheme of schemes) {
                try {
                    return new NodeRSA(key, f, { signingScheme, });
                } catch (e) {
                    // console.log(e)
                }
            }
        }
    }
}
const key = getKey();
if (!key) {
    console.log("NO KEY")
    process.exit()
} else {
    console.log("Found!")
}
const ok = key.verify(XML, SIGNATURE);
console.log(ok)
