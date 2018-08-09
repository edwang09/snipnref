module.exports = function extractbasics(contents) {
  let result = {};
  const birthplaceindex = contents.findIndex(text => {
    return text.includes("出生地");
  });
  result.birthplace = contents[birthplaceindex + 1];

  const longitudesindex = contents.findIndex(text => {
    return text.includes("经度");
  });
  result.longitudes = contents[longitudesindex + 1];
  const clocktimeindex = contents.findIndex(text => {
    return text.includes("出生钟表时间");
  });
  result.clocktime = contents[clocktimeindex + 1];

  const localtimeindex = contents.findIndex(text => {
    return text.includes("出生地方时间");
  });
  result.localtime = contents[localtimeindex + 1];

  const suntimeindex = contents.findIndex(text => {
    return text.includes("出生真太阳时");
  });
  result.suntime = contents[suntimeindex + 1];

  const realtimeindex = contents.findIndex(text => {
    return text.includes("实际出生时间");
  });
  result.realtime = contents[realtimeindex + 1];

  const dateindex = contents.findIndex(text => {
    return text.includes("公历");
  });
  result.date = contents[dateindex + 1];

  const lunarindex = contents.findIndex(text => {
    return text.includes("农历");
  });
  result.lunar =
    contents[lunarindex + 1] +
    "[" +
    contents[lunarindex + 2] +
    "]" +
    contents[lunarindex + 3];

  const qiyunindex = contents.findIndex(text => {
    return text.includes("起运");
  });
  result.qiyun = contents[qiyunindex + 1];

  const jiaoyunindex = contents.findIndex(text => {
    return text.includes("交运");
  });
  result.jiaoyun = contents[jiaoyunindex + 1];
  return result;
};
