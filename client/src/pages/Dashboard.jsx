import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../api/orders';

const Dashboard = () => {
  const { token } = useSelector(state => state.auth);
  console.log(token);
  const authState = useSelector(state => state.auth);
  console.log('Auth State in Redux:', authState);
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ items: '', totalPrice: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders(token, page);
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token, page]);

  const handleCreateOrder = async () => {
    if (!newOrder.items || !newOrder.totalPrice) {
      setError('All fields are required');
      return;
    }

    try {
      const orderData = {
        items: [{ name: newOrder.items, quantity: 1 }],
        totalPrice: parseFloat(newOrder.totalPrice),
        status: 'Pending',
      };
      const createdOrder = await createOrder(orderData, token);

      setOrders([createdOrder, ...orders]);

      setNewOrder({ items: '', totalPrice: '' });
      setError(null);
    } catch (err) {
      setError('Failed to create order');
    }
  };

  const handleDeleteOrder = async id => {
    try {
      await deleteOrder(id, token);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const handleUpdateOrder = async (id, newStatus) => {
    try {
      const updatedOrder = await updateOrder(id, { status: newStatus }, token);
      setOrders(orders.map(order => (order._id === id ? updatedOrder : order)));
    } catch (err) {
      setError('Failed to update order');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold">Create New Order</h2>
        <input
          type="text"
          placeholder="Item Name"
          className="border p-2 w-full my-2"
          value={newOrder.items}
          onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Price"
          className="border p-2 w-full my-2"
          value={newOrder.totalPrice}
          onChange={e =>
            setNewOrder({ ...newOrder, totalPrice: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleCreateOrder}
        >
          Create Order
        </button>
      </div>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length > 0 ? (
        <div>
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded-lg mb-2">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Items:</strong>{' '}
                {order.items
                  .map(item => `${item.name} (x${item.quantity})`)
                  .join(', ')}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <div className="mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpdateOrder(order._id, 'Shipped')}
                >
                  Mark as Shipped
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpdateOrder(order._id, 'Delivered')}
                >
                  Mark as Delivered
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No orders found.</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
