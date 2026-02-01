import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

export default function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = query(ref(db, 'orders'), orderByChild('uid'), equalTo(currentUser.uid));
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = [];
      for(const key in data) loaded.push({id: key, ...data[key]});
      setOrders(loaded.reverse()); // Newest first
    });
  }, [currentUser]);

  return (
    <div className="container">
      <h2>My Orders</h2>
      <div className="grid" style={{ marginTop: '1rem' }}>
        {orders.map(order => (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Order #{order.id.slice(-6)}</strong>
              <span style={{ 
                color: order.status === 'delivered' ? 'var(--success)' : 'var(--accent)',
                textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold'
              }}>{order.status}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
            <div style={{ margin: '0.5rem 0' }}>
              {order.items.map(i => (
                <div key={i.id} style={{ fontSize: '0.9rem' }}>{i.quantity}x {i.title}</div>
              ))}
            </div>
            <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
