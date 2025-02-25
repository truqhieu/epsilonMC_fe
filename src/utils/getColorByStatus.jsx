export const getColorByStatus = (status) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Cancelled":
      return "red";
    case "Pending":
      return "gold";
    case "Rejected":
      return "volcano";
    case "Completed":
      return "blue";
    default:
      return "default";
  }
};
