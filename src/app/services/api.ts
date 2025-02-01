const API_URL = 'http://localhost:5002/api';

export const adminApi = {
  // Get all products
  getProducts: async () => {
    try {
      console.log('Fetching from:', `${API_URL}/products`); // Debug URL
      const res = await fetch(`${API_URL}/products`);
      console.log('Response status:', res.status); // Debug response
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Received data:', data); // Debug data
      return data;
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (formData: FormData) => {
    try {
      const res = await fetch(`${API_URL}/admin/products`, {
        method: 'POST',
        body: formData,
        // Remove headers as FormData sets its own
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id: string, formData: FormData) => {
    try {
      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'PUT',
        body: formData,
        // Remove headers as FormData sets its own
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
}; 