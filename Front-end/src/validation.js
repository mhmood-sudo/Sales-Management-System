

export function isValidProductName(name) {
  return name.trim() !== "";
}

export function isValidPrice(price) {
  return !isNaN(price) && price > 0;
}