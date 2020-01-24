const { writeFileSync } = require("fs");
const {
  PUBLIC_KEY,
  XML,
  SIGNATURE,
} = require("./constants");
const fmt = require("./fmt");
const pem = require("./pem");
const nopad = false;

writeFileSync("./signature.sign", SIGNATURE);
writeFileSync("./signed.xml", XML);
writeFileSync("./public.key", PUBLIC_KEY);
writeFileSync("./public.pem", pem(fmt(PUBLIC_KEY), "public"));
writeFileSync("./public.nopad.pem", pem(fmt(PUBLIC_KEY), "public"));
writeFileSync("./public.rsa.pem", pem(fmt(PUBLIC_KEY), "rsa"));
writeFileSync("./public.nopad.rsa.pem", pem(fmt(PUBLIC_KEY), "rsa"));
