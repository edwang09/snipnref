module.exports = function extractqianzao(contents) {
  const startIndex = contents.indexOf(
    "twoline",
    contents.indexOf("twoline") + 1
  );
  contents = contents.slice(startIndex);
  let result = {
    bazi: [],
    qiankun: "",
    kong: ""
  };
  let line = 1;
  let start, end, over;
  start = 1;
  over = contents.indexOf("twoline", 1);
  do {
    end = contents.indexOf("newline", start);
    if (over < end) {
      end = over;
      result.qiankun = contents[start];
      result.kong = contents[end - 1];
      start = start + 1;
      end = end - 1;
    }
    result.bazi.push(contents.slice(start, end));
    start = end + 1;
  } while (end < over - 1);
  return result;
};
