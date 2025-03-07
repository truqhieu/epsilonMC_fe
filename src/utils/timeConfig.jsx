import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import moment from "moment";

dayjs.extend(utc);
dayjs.extend(timezone);
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

export const formatDate = (time) => {
  return moment.utc(time).format("DD/MM/YYYY");
};

export const fomatTime = (time) => {
  return moment(time).format("HH:mm");
};

export const convertToVietnamTime = (date) => {
  return dayjs(date).tz(vietnamTimeZone).format("DD/MM/YYYY");
};
