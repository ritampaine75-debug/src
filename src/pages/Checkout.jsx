import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address) return alert("Address required");
    
    setLoading(true);
    const orderRef = push(ref(db, 'orders'));
    const order = {
      uid: currentUser.uid,
      items: cart,
      total,
      address,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await set(orderRef, order);
    clearCart();
    setLoading(false);
    navigate('/orders');
  };

  return (
    <div className="container animate-in">
      <h2>Checkout</h2>
      <div className="card" style={{ marginTop: '1rem' }}>
        <p>Total Amount: <strong>${total.toFixed(2)}</strong></p>
        <form onSubmit={handleOrder} style={{ marginTop: '1rem' }}>
          <textarea 
            placeholder="Shipping Address..." 
            value={address} 
            onChange={e => setAddress(e.target.value)}
            rows="4"
          ></textarea>
          <button disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
