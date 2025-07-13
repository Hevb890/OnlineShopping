import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(newQuantity) || 0 } : item
      )
    );
  };

  const updateQuantity = (id, quantity, pricePerUnit) => {
    axios.put(`http://localhost:8080/api/products/${id}`, null, {
      params: {
        quantity,
        pricePerUnit,
      },
    })
    .then(() => {
      alert('Quantity updated successfully!');
      fetchProducts();
    })
    .catch(() => alert('Failed to update product'));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Inventory</h2>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Price/unit (₹)</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">
                <img
                  src={product.imageUrl} // If image is stored as URL
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/80'} // fallback image
                />
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">₹{product.pricePerUnit}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => updateQuantity(product.id, product.quantity, product.pricePerUnit)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
