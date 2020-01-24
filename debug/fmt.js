const fmt = data => {
  const out = [];
  let line = "";
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (count < 64) {
      ++count;
      line += data[i];
    } else {
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
module.exports = fmt;