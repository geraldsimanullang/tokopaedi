export function formatPrice(price: number) {
  return "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
