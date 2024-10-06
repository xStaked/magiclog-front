import { Product, AdminProduct } from "@/types/Product.interface";

function filterByNameOrSKU(
  products: (Product | AdminProduct)[],
  searchFilter: string
): (Product | AdminProduct)[] {
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchFilter.toLowerCase())
  );
}

function filterByPrice(
  products: (Product | AdminProduct)[],
  priceRange: number[]
): (Product | AdminProduct)[] {
  return products.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );
}

function filterBySellers(
  products: (Product | AdminProduct)[],
  selectedSellers: number[]
): (Product | AdminProduct)[] {
  return products.filter(
    (product) =>
      "container" in product &&
      product.container &&
      product.container.user &&
      selectedSellers.includes(product.container.user.id)
  );
}

export function filterProducts(
  products: (Product | AdminProduct)[],
  searchFilter: string,
  priceRange: number[],
  selectedSellers: number[] = []
): (Product | AdminProduct)[] {
  let filteredProducts = filterByNameOrSKU(products, searchFilter);
  filteredProducts = filterByPrice(filteredProducts, priceRange);

  if (selectedSellers.length > 0) {
    filteredProducts = filterBySellers(filteredProducts, selectedSellers);
  }

  return filteredProducts;
}
