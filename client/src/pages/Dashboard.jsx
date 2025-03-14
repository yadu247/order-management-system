import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../api/orders';
import { logout } from '../redux/slices/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ items: '', totalPrice: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders(token, page);
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('⚠️ Failed to load orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token, page]);

  const handleCreateOrder = async () => {
    if (!newOrder.items || !newOrder.totalPrice) {
      setError('⚠️ All fields are required');
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
      setError('⚠️ Failed to create order');
    }
  };

  const handleDeleteOrder = async id => {
    try {
      await deleteOrder(id, token);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      setError('⚠️ Failed to delete order');
    }
  };

  const handleUpdateOrder = async (id, newStatus) => {
    try {
      const updatedOrder = await updateOrder(id, { status: newStatus }, token);
      setOrders(orders.map(order => (order._id === id ? updatedOrder : order)));
    } catch (err) {
      setError('⚠️ Failed to update order');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          📦 Order Management
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white mb-4 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="bg-white/20 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-white">Create New Order</h2>
          <input
            type="text"
            placeholder="Item Name"
            className="w-full px-4 py-3 bg-white/30 text-white rounded-lg border border-white/40 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70 my-2"
            value={newOrder.items}
            onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Price"
            className="w-full px-4 py-3 bg-white/30 text-white rounded-lg border border-white/40 focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70 my-2"
            value={newOrder.totalPrice}
            onChange={e =>
              setNewOrder({ ...newOrder, totalPrice: e.target.value })
            }
          />
          <button
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white"
            onClick={handleCreateOrder}
          >
            ➕ Create Order
          </button>
        </div>

        {loading && <p className="text-white text-center">Loading orders...</p>}
        {!loading && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order._id}
                className="bg-white/20 p-4 rounded-lg shadow-md"
              >
                <p className="text-white">
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p className="text-white">
                  <strong>Items:</strong>{' '}
                  {order.items
                    .map(item => `${item.name} (x${item.quantity})`)
                    .join(', ')}
                </p>
                <p className="text-white">
                  <strong>Total Price:</strong> ₹{order.totalPrice}
                </p>
                <p className="text-white">
                  <strong>Status:</strong> {order.status}
                </p>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleUpdateOrder(order._id, 'Shipped')}
                  >
                    🚚 Mark as Shipped
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => handleUpdateOrder(order._id, 'Delivered')}
                  >
                    ✅ Mark as Delivered
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-white text-center">No orders found.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅️ Previous
          </button>
          <p className="text-white">
            Page {page} of {totalPages}
          </p>
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
