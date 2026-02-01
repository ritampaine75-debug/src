import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div className="card animate-in">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.title} />
      </Link>
      <div style={{ padding: '0.5rem 0' }}>
        <h3 style={{ fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{product.category}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${product.price}</span>
          <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
