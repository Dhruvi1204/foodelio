import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { FaBox, FaRupeeSign, FaUtensils, FaStore, FaUsers } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const Dashboard = () => {

  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔹 Fetch stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/stats");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Fetch orders
  const fetchRecentOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/recent-orders");
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  // 🔹 Chart
  const chartData = [
    { name: "Mon", orders: 5 },
    { name: "Tue", orders: 8 },
    { name: "Wed", orders: 6 },
    { name: "Thu", orders: 10 },
    { name: "Fri", orders: 7 },
    { name: "Sat", orders: 12 },
    { name: "Sun", orders: 9 },
  ];

  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 🔥 CARDS */}
          <div className="cards">
            <div className="card blue">
              <FaBox className="icon" />
              <h3>Total Orders</h3>
              <p>{data.totalOrders}</p>
            </div>

            <div className="card green">
              <FaRupeeSign className="icon" />
              <h3>Total Revenue</h3>
              <p>₹{data.totalRevenue}</p>
            </div>

            <div className="card orange">
              <FaUtensils className="icon" />
              <h3>Total Foods</h3>
              <p>{data.totalFoods}</p>
            </div>

            <div className="card purple">
              <FaStore className="icon" />
              <h3>Total Restaurants</h3>
              <p>{data.totalRestaurants}</p>
            </div>

            <div className="card red">
              <FaUsers className="icon" />
              <h3>Total Users</h3>
              <p>{data.totalUsers}</p>
            </div>
          </div>

          {/* 🔥 CHART */}
          <div className="chart-container">
            <h3>Orders Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ff4d2d"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 RECENT ORDERS */}
          <div className="recent-orders">
            <h3>Recent Orders</h3>

            {orders.length === 0 ? (
              <p>No recent orders</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => setSelectedOrder(order)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>#{order._id.slice(-5)}</td>
                      <td>{order.userId?.name || "Unknown"}</td>
                      <td>{order.items.length}</td>
                      <td>₹{order.amount}</td>
                      <td>
                        <span
                          className={`status ${
                            order.status
                              ? order.status.toLowerCase().replace(/ /g, "-")
                              : "pending"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 🔥 MODAL */}
          {selectedOrder && (
            <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>

                <h2>Order Details</h2>

                <p><strong>ID:</strong> #{selectedOrder._id}</p>
                <p><strong>User:</strong> {selectedOrder.userId?.name}</p>
                <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>

                <h3>Items:</h3>
                <ul>
                  {selectedOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>

                <button onClick={() => setSelectedOrder(null)}>Close</button>

              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default Dashboard;