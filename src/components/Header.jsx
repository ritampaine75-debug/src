import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { currentUser, userData, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header>
      <div className="container nav-flex">
        <Link to="/" className="logo">ZENSHOP</Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {userData?.role === 'admin' && (
            <Link to="/admin" className="hide-mobile" style={{color: 'var(--accent)'}}>Admin</Link>
          )}
          
          <Link to="/cart" style={{ position: 'relative' }}>
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </Link>

          {currentUser ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
               <Link to="/orders"><i className="fa-solid fa-user"></i></Link>
               <button onClick={logout} className="btn-secondary" style={{padding: '4px 8px', fontSize: '0.8rem'}}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
