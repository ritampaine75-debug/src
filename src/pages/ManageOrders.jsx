import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { ref, onValue, update } from "firebase/database";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'orders'), (snapshot) => {
      const data = snapshot.val();
      const loaded = [];
      for(const key in data) loaded.push({id: key, ...data[key]});
      setOrders(loaded.reverse());
    });
  }, []);

  const updateStatus = (id, status) => {
    update(ref(db, `orders/${id}`), { status });
  };

  return (
    <div className="container">
      <h2>Manage Orders</h2>
      <div className="grid" style={{ marginTop: '1rem' }}>
        {orders.map(order => (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <strong>#{order.id.slice(-6)}</strong>
              <strong>${order.total.toFixed(2)}</strong>
            </div>
            <p style={{ fontSize: '0.8rem' }}>Addr: {order.address}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '0.8rem', background: order.status === 'pending' ? 'var(--primary)' : '' }}
                onClick={() => updateStatus(order.id, 'pending')}
              >Pending</button>
              <button 
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', background: order.status === 'shipped' ? 'var(--accent)' : '' }}
                onClick={() => updateStatus(order.id, 'shipped')}
              >Shipped</button>
              <button 
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', background: order.status === 'delivered' ? 'var(--success)' : '' }}
                onClick={() => updateStatus(order.id, 'delivered')}
              >Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
