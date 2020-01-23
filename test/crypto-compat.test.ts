import crypto from "crypto";
import * as sampleData from "./sample-data";

describe("RSA sign, verify", () => {
  it("License Manager Works", () => {
    const { private: pvtKey, public: pubKey } = Keys;
    var data = "xyz";
    let signature;
    {
      const sign = crypto.createSign("RSA-SHA256");
      sign.update(data);
      signature = sign.sign(pemEncode(pvtKey, "private"));
    }
    {
      const verify = crypto.createVerify("RSA-SHA256");
      verify.update(data);
      expect(verify.verify(pemEncode(pubKey, "public"), signature)).toBe(true);
    }
  });

  it("Standard works", () => {
    const { private: pvtKey, public: pubKey } = Keys2;
    var data = "xyz";
    let signature;
    {
      const sign = crypto.createSign("RSA-SHA256");
      sign.update(data);
      signature = sign.sign(pemEncode(pvtKey, "private"));
    }
    {
      const verify = crypto.createVerify("RSA-SHA256");
      verify.update(data);
      expect(verify.verify(pemEncode(pubKey, "public"), signature)).toBe(true);
    }
  });
});

const EOL = "\n";
function pemEncode(key: string, mode: "private" | "public") {
  switch (mode) {
    case "public":
      return (
        "-----BEGIN PUBLIC KEY-----" +
        EOL +
        key +
        EOL +
        "-----END PUBLIC KEY-----"
      );
    case "private":
      return (
        "-----BEGIN PRIVATE KEY-----" +
        EOL +
        key +
        EOL +
        "-----END PRIVATE KEY-----"
      );
    default:
      throw new Error("Invalid mode: " + mode);
  }
}
/**
 * License manageerr Keys
 * public: is `Asn1 Pkcs` , der encoded
 * salt = byte[16]; // random
 * ToBase64String (
 *    privateKeyFactory.EncryptKey(
 *      keyEncryptionAlgorithm,
 *      passPhrase.ToCharArray(),
 *      salt, 10, key)
 * )
 */
const Keys = {
  /** base64 encoded, encrypted, passPhrase = "test" */
  private: `"MIICITAjBgoqhkiG9w0BDAEDMBUEEF5Fx1gxrWd+0G10a7+UbxQCAQoEggH4SUUim2C3kcHApCKVgIeXpKlZQHcaRgfWt0rVEWr8zRnzO9xT5itU2Sw7j0N3oh6cPer/QGNCmAgnRyiDatruJznDPOmMzK5Yskj6mlCaY6JEjcol+E4SBZJDgvIejy8HVCy+DOIR42JXs9oxgeq8eqB+0RZwvDMBG2hrUjnZ4/hPKRPJY134cqTH68jLv6SXglIPcrL9OxOwdzJBaq0ngSBfqhBWbLRIy/Th2btl9Q/0b+sZxG6r2b80wOxIewlr6EUqXtMaA8Bo5dgVZt1itWYafIAbLWzjZavwdO+EkUMCjZhsfvbXSCmcLRmitdJ6beG7jg7R6m6Q92DpU3qZhEio9akX3MQmOTO63Er4T2t6HHYnTzPaZPjdn8D+8lcTUntp/0vD8SvC3+Cb7tZOHSVGMUDdj7WIW+Bl/5bhdmnChE83HSxR4OsBjLATuZOpYtOefWbXyT8qsUn1IouaCjH+BYejBIPrmFVVl0WZADtbyE0LAOyHCD2quAjCpIwXXONG/gXm+XVGst5clbcuxaG4TxKWA8ifIXaio3aJgLfI+D0Izt2GscKRg6oGTlbC3YFIJg+PAH3A4qufoRSPmtREz0oR1X1ZsS6m/IKezf8vl3S+fSpmR/mUuc6uBx9qI9yJIEW/In90r5vO9fKGusEElP6svlub"`,
  /** Asn1 Pkcs encoded */
  public: `MIIBKjCB4wYHKoZIzj0CATCB1wIBATAsBgcqhkjOPQEBAiEA/////wAAAAEAAAAAAAAAAAAAAAD///////////////8wWwQg/////wAAAAEAAAAAAAAAAAAAAAD///////////////wEIFrGNdiqOpPns+u9VXaYhrxlHQawzFOw9jvOPD4n0mBLAxUAxJ02CIbnBJNqZnjhE50mt4GffpAEIQNrF9Hy4SxCR/i85uVjpEDydwN9gS3rM6D0oTlF2JjClgIhAP////8AAAAA//////////+85vqtpxeehPO5ysL8YyVRAgEBA0IABNVLQ1xKY80BFMgGXec++Vw7n8vvNrq32PaHuBiYMm0PEj2JoB7qSSWhfgcjxNVJsxqJ6gDQVWgl0r7LH4dr0KU="`,
};
/**
 * Standard Keys
 */
const Keys2 = {  
  public:
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbbBSVpWzSmCGVeezhuVFgUEYowUxgX/SnFdymGRCHGc77d5I0xkMAnIOWbI2MmP8j/7sdfPuUF0V5zw+Hd/7iZ6vs2k4JRKdprrB/zSC4GGqCDpDkbRYydcw3kwDgKkHhDp6NwIKvvl87WsnFozi487tGPQ8NO15hngwsV7DrawIDAQAB",
  private:
    "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJtsFJWlbNKYIZV57OG5UWBQRijBTGBf9KcV3KYZEIcZzvt3kjTGQwCcg5ZsjYyY/yP/ux18+5QXRXnPD4d3/uJnq+zaTglEp2musH/NILgYaoIOkORtFjJ1zDeTAOAqQeEOno3Agq++XztaycWjOLjzu0Y9Dw07XmGeDCxXsOtrAgMBAAECgYAV13iFFzxV1B9UHFBX4G05Nc7GR3PuT03YdVAO35LdCZl26XTYicw8t8IeT58M1St16ahoGnpYc3TGC31JMmnVOr58At0jbd4JQgvUaE+2jVvgp0Lc6n/jN+7NYBGlEy44ZpIRbB1Biu7khCZ0D+8PZsDMi6WJK4jgI5Gf/aXvkQJBAOe6809U/1wEVDJFHZ6A++WI/8iebXSbw9hDa4a9qoXv8bsMjYkDiblD3UPRlTEdFsAOA/YuGdah+fKE7jKdKkcCQQCrszD8Z1MYWYE4dMQTRPxEKHGQZd5HHkTQu9l6FV7Bv2ga9wLhT4QTb/5U7WYGgbfxhFzklxoqsmhTJNuLlyO9AkBrA1nDZBQ9MT6UrHheL2Ckgpzkz8zqUdiicZghdEtgaQtv/v8JrBmY9e8jl5DXSoCsFozbzjReexTLW3oI462XAkEAnTQ/kZl4tz6b1XjzXUE4R59P+wmJ7kuEbijQAbs3OuVpB+dJN8l5/+H2VwPU+fgi1np+Ir1GM/mNEzMX4ELNcQJBAIk1s3Y7ep2gK0p4js4f9HU0u2vH25+6bu+y6JFfvIBd8OR1bCFEe3FIui1H/ohh0Eoo3ZgJZ/5JjwfsqJzOoBs=",
};
