import { Product } from "@/types";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const url = `${BASE_URL}/products`;

    console.log("Fetching:", url);

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Response:", text);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Fetch Error (getProducts):", err);
    throw err;
  }
}


// export async function getCategories(): Promise<string[]> {
//   const url = `${BASE_URL}/products/categories`;
//
//   console.log("Fetching:", url);
//
//   try {
//     const res = await fetch(url, {
//       next: { revalidate: 3600 },
//     });
//
//     console.log("Status:", res.status);
//     console.log("Status Text:", res.statusText);
//
//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Response:", text);
//       throw new Error(`Failed to fetch categories: ${res.status}`);
//     }
//
//     return res.json();
//   } catch (err) {
//     console.error("Fetch Error:", err);
//     throw err;
//   }
// }

export async function getCategories(): Promise<string[]> {
  try {
    console.log("Fetching categories from products...");

    const products = await getProducts();

    const categories = [...new Set(products.map((p) => p.category))];

    console.log("Categories:", categories);

    return categories;
  } catch (err) {
    console.error("Fetch Error (getCategories):", err);
    throw err;
  }
}


// export async function getProductsByCategory(
//   category: string
// ): Promise<Product[]> {
//   const res = await fetch(
//     `${BASE_URL}/products/category/${encodeURIComponent(category)}`,
//     {
//       next: { revalidate: 60 },
//     }
//   );
//
//   if (!res.ok)
//     throw new Error(`Failed to fetch products for ${category}`);
//
//   return res.json();
// }

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    console.log(`Filtering products for category: ${category}`);

    const products = await getProducts();

    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    console.log(
      `Found ${filteredProducts.length} products in category "${category}"`
    );

    return filteredProducts;
  } catch (err) {
    console.error("Fetch Error (getProductsByCategory):", err);
    throw err;
  }
}


// export async function getProduct(id: number): Promise<Product> {
//   const res = await fetch(`${BASE_URL}/products/${id}`, {
//     next: { revalidate: 60 },
//   });
//
//   if (!res.ok)
//     throw new Error(`Failed to fetch product ${id}`);
//
//   return res.json();
// }

export async function getProduct(id: number): Promise<Product> {
  try {
    console.log(`Finding product with id: ${id}`);

    const products = await getProducts();

    const product = products.find((product) => product.id === id);

    if (!product) {
      throw new Error(`Product ${id} not found`);
    }

    console.log("Product found:", product.title);

    return product;
  } catch (err) {
    console.error("Fetch Error (getProduct):", err);
    throw err;
  }
}