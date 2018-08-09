module.exports = function extractqianzao(contents) {
  const startIndex = contents.indexOf(
    "twoline",
    contents.indexOf("twoline", contents.indexOf("twoline") + 1) + 1
  );
  contents = contents.slice(startIndex);
  let result = [];
  let start, end, over;
  start = 1;
  over = contents.indexOf("twoline", 1);
  do {
    end = contents.indexOf("newline", start);
    if (over < end) {
      end = over;
    }
    result.push(contents.slice(start, end));
    start = end + 1;
  } while (end < over);
  return result;
};
