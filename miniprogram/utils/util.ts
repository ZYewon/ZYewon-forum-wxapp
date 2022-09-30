import dayjs from "./dayjs";
import relativeTime from "./relativeTime";
import zhCN from "./zhCN";
dayjs.extend(relativeTime);
dayjs.locale(zhCN);
export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

export const formatDay = (time: any) => {
  if (dayjs(time).isBefore(dayjs().subtract(7, "day"))) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return dayjs(time).from(dayjs());
  }
};

export const formatCatalog = (catalog: string) => {
  // 	帖子分类：index-全部，ask-提问，advice-建议，discuss-交流，share-分享，news-动态
  const data: any = {
    提问: "ask",
    建议: "advice",
    交流: "discuss",
    分享: "share",
    动态: "news",
  };
  return data[catalog];
};

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const formatSignFav = (count: number) => {
  if (count < 5) {
    return 5;
  } else if (count >= 5 && count < 15) {
    return 10;
  } else if (count >= 15 && count < 30) {
    return 15;
  } else if (count >= 30 && count < 100) {
    return 20;
  } else if (count >= 100 && count < 365) {
    return 30;
  } else if (count >= 365) {
    return 50;
  }
};
