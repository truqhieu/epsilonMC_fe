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
    case "PendingPayment":
      return "orange";
    default:
      return "default";
  }
};
