import moment from "moment";
export const formatDate = (time) => {
  return moment.utc(time).format("DD/MM/YYYY");
};

export const fomatTime = (time) => {
  return moment(time).format("HH:mm");
};
