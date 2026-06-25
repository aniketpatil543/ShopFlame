import { Product } from "@/types";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const BASE_URL = "https://fakestoreapi.com";


export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// this category url is not working on deployed site , fakestore cloudflare is blocking it, so commenting it out for now

// export async function getCategories(): Promise<string[]> {
//   const url = `${BASE_URL}/products/categories`;

//   console.log("Fetching:", url);

//   try {
//     const res = await fetch(url, {
//       next: { revalidate: 3600 },
//     });

//     console.log("Status:", res.status);
//     console.log("Status Text:", res.statusText);

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Response:", text);
//       throw new Error(`Failed to fetch categories: ${res.status}`);
//     }

//     return res.json();
//   } catch (err) {
//     console.error("Fetch Error:", err);
//     throw err;
//   }
// }

// alternate way for fetching categories using a different endpoint that works on deployed site
export async function getCategories(): Promise<string[]> {
  const products = await getProducts();

  return [...new Set(products.map((p) => p.category))];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products for ${category}`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}
