'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { adminApi } from '../services/api'
import { Product } from '../data/products'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    console.log('AdminPage mounted');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log('Fetching products...');
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminApi.getProducts();
      console.log('Fetched products:', data);
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setImageFile(null)
  }

  const handleDelete = async (productId: string) => {
    try {
      await adminApi.deleteProduct(productId);
      setProducts(products.filter(p => p._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProduct) return

    try {
      const formData = new FormData();
      formData.append('name', selectedProduct.name);
      formData.append('price', selectedProduct.price.toString());
      formData.append('description', selectedProduct.description);
      formData.append('category', selectedProduct.category);
      formData.append('countInStock', selectedProduct.countInStock.toString());
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      let updatedProduct;
      if (selectedProduct._id === String(Date.now())) {
        console.log('Creating new product...'); // Debug log
        updatedProduct = await adminApi.createProduct(formData);
        console.log('Created product:', updatedProduct); // Debug log
        setProducts([updatedProduct, ...products]);
      } else {
        console.log('Updating product...'); // Debug log
        updatedProduct = await adminApi.updateProduct(selectedProduct._id, formData);
        console.log('Updated product:', updatedProduct); // Debug log
        setProducts(products.map(p => 
          p._id === updatedProduct._id ? updatedProduct : p
        ));
      }

      setIsEditing(false);
      setSelectedProduct(null);
      setImageFile(null);
      toast.success('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    console.log('Loading...'); // Debug log
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log('Rendering products:', products); // Debug log
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              setSelectedProduct({
                _id: String(Date.now()),
                name: '',
                price: 0,
                image: '',
                description: '',
                category: '',
                countInStock: 0,
                createdAt: new Date().toISOString()
              })
              setIsEditing(true)
            }}
          >
            Add New Product
          </button>
        </div>

        {isEditing && selectedProduct ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct._id === String(Date.now()) ? 'Add New Product' : 'Edit Product'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={e => setSelectedProduct({...selectedProduct, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={e => setSelectedProduct({...selectedProduct, price: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {(selectedProduct.image || imageFile) && (
                  <div className="mt-2">
                    <Image
                      src={imageFile ? URL.createObjectURL(imageFile) : selectedProduct.image}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={selectedProduct.description}
                  onChange={e => setSelectedProduct({...selectedProduct, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={selectedProduct.category}
                  onChange={e => setSelectedProduct({...selectedProduct, category: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={selectedProduct.countInStock}
                  onChange={e => setSelectedProduct({...selectedProduct, countInStock: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedProduct(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.countInStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
