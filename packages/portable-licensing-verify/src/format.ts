
export const PUBLIC_KEY_START = '-----BEGIN PUBLIC KEY-----';
export const PUBLIC_KEY_END = '-----END PUBLIC KEY-----';
/** */
const wrap = (data: string) => {
    return `${PUBLIC_KEY_START}\n${data}\n${PUBLIC_KEY_END}`;
}
/** format: PKCS_8 */
const format = (data: string) => {
    const out: string[] = [];
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
    return wrap(out.join("\n")) + "\n";
};
export default format;