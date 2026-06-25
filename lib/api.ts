// import { Product } from "@/types";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// const BASE_URL = "https://fakestoreapi.com";


// export async function getProducts(): Promise<Product[]> {
//   const res = await fetch(`${BASE_URL}/products`, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

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

// export async function getProductsByCategory(category: string): Promise<Product[]> {
//   const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch products for ${category}`);
//   return res.json();
// }

// export async function getProduct(id: number): Promise<Product> {
//   const res = await fetch(`${BASE_URL}/products/${id}`, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
//   return res.json();
// }


import { Product } from "@/types";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const BASE_URL = "https://dummyjson.com";


interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: unknown[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: unknown;
  images: string[];
  thumbnail: string;
}

interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

function mapProduct(product: DummyProduct): Product {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail,
    rating: {
      rate: product.rating,
      count: product.stock,
    },
  };
}


export async function getProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/products`;

  console.log("Fetching:", url);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Response:", text);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data: DummyProductsResponse = await res.json();

    return data.products.map(mapProduct);
  } catch (err) {
    console.error("Fetch Error (getProducts):", err);
    throw err;
  }
}


export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/categories`;

  console.log("Fetching:", url);

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Response:", text);
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data: {
      slug: string;
      name: string;
      url: string;
    }[] = await res.json();

    return data.map((category) => category.slug);
  } catch (err) {
    console.error("Fetch Error (getCategories):", err);
    throw err;
  }
}


export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const url = `${BASE_URL}/products/category/${encodeURIComponent(category)}`;

  console.log("Fetching:", url);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Response:", text);
      throw new Error(`Failed to fetch products for ${category}`);
    }

    const data: DummyProductsResponse = await res.json();

    return data.products.map(mapProduct);
  } catch (err) {
    console.error("Fetch Error (getProductsByCategory):", err);
    throw err;
  }
}


export async function getProduct(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;

  console.log("Fetching:", url);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Response:", text);
      throw new Error(`Failed to fetch product ${id}`);
    }

    const product: DummyProduct = await res.json();

    return mapProduct(product);
  } catch (err) {
    console.error("Fetch Error (getProduct):", err);
    throw err;
  }
}