// src/validation.test.js

function isValidProductName(name) {
  return name.trim() !== "";
}

function isValidPrice(price) {
  return !isNaN(price) && price > 0;
}

test('should fail for empty product name', () => {
  expect(isValidProductName("")).toBe(false);
});

test('should pass for valid product name', () => {
  expect(isValidProductName("Laptop")).toBe(true);
});

test('should fail for negative price', () => {
  expect(isValidPrice(-5)).toBe(false);
});

test('should pass for valid price', () => {
  expect(isValidPrice(9.99)).toBe(true);
});