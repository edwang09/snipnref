module.exports = function extractdayun(contents) {
  const startIndex = contents.indexOf("大运");
  contents = contents.slice(startIndex);
  let result = {
    dayun: [],
    taiyuan: [],
    minggong: []
  };
  let line = 1;
  let start, end, over;
  start = 1;
  over = contents.indexOf("胎元", 1) - 1;
  do {
    end = contents.indexOf("newline", start);
    if (over <= end) {
      end = over;
    }
    result.dayun.push(contents.slice(start, end));
    start = end + 1;
  } while (end < over);

  end = contents.indexOf("newline", start);
  result.taiyuan.push(contents.slice(start + 1, end));
  start = end + 1;

  end = contents.indexOf("twoline", start);
  result.minggong.push(contents.slice(start + 1, end));
  start = end + 1;

  return result;
};
