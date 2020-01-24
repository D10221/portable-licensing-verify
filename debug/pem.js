const EOL = "\n";
module.exports = function pem(key, mode) {
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
        return key;
    }
  }