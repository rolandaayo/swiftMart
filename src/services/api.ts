const BASE_URL = "http://localhost:5002/api";

export const api = {
  // Product APIs
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Cart APIs
  getCart: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/cart/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  addToCart: async (userId: string, productId: string, quantity: number) => {
    const response = await fetch(`${BASE_URL}/cart/${userId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  removeFromCart: async (userId: string, productId: string) => {
    const response = await fetch(`${BASE_URL}/cart/${userId}/remove/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  updateCartItem: async (userId: string, productId: string, quantity: number) => {
    const response = await fetch(`${BASE_URL}/cart/${userId}/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },
}; 