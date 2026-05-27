export const formatValue = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
