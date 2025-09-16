import dayjs from "dayjs";

// 9 Sept 2025
export const formatDate = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

// 10 September 2025
export const formatFullDate = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY");
};