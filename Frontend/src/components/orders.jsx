import React, { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/user-orders`); // Update port if needed
        const data = await res.json();
        console.log(data)
        setOrders(Array.isArray(data) ? data : data.orders || []);

      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Orders</h2>
      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Total (₹)</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">ORD-{order.orderId}</td>
                <td className="px-4 py-3">
                  <ul className="list-disc ml-4 space-y-1">
                    {order.items?.map((prod, i) => (
                      <li key={i}>
                        <span className="font-medium">{prod.productName}</span> × {prod.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-indigo-600 font-semibold">₹{order.totalPrice}</td>
                <td className="px-4 py-3">{order.userEmail}</td>
                <td className="px-4 py-3">{order.shippingAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
