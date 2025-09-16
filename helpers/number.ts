export const formatRupiah = (number: number) => {
  const formatted = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatted.replace("Rp", "Rp. ");
};