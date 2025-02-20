import moment from "moment";

export const fomatDate = (time) => {
  return moment(time).format("DD/MM/YYYY");
};

export const fomatTime = (time) => {
  return moment(time).format("HH:mm");
};
