import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Your cart is empty</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
    </div>
  );

  return (
    <div className="container animate-in">
      <h2>Shopping Cart</h2>
      <div className="grid" style={{ marginTop: '1rem' }}>
        {cart.map(item => (
          <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src={item.imageUrl} style={{ width: '80px', height: '80px' }} />
            <div style={{ flex: 1 }}>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{padding: '5px 10px'}} onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button className="btn btn-secondary" style={{padding: '5px 10px'}} onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <button style={{ color: 'var(--danger)', background: 'transparent' }} onClick={() => removeFromCart(item.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout" className="btn btn-primary" style={{ marginTop: '1rem' }}>Proceed to Checkout</Link>
      </div>
    </div>
  );
}
