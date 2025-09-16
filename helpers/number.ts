export const formatRupiah = (number: number) => {
  const formatted = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatted.replace("Rp", "Rp. ");
};

export const formatCurrency = (value: string) => {
    // Hapus semua karakter non-digit
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format dengan titik sebagai pemisah ribuan
    if (numericValue === "") {
      return "";
    }

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };