import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { ref, get } from "firebase/database";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    get(ref(db, `products/${id}`)).then(snapshot => {
      if(snapshot.exists()) setProduct({ id, ...snapshot.val() });
    });
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container animate-in">
      <div className="card grid" style={{ gridTemplateColumns: "1fr", gap: "2rem" }}>
        <img src={product.imageUrl} style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} />
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{product.title}</h1>
          <p style={{ color: "var(--primary)", fontSize: "1.5rem", fontWeight: "bold" }}>${product.price}</p>
          <p style={{ margin: "1rem 0", color: "#cbd5e1", lineHeight: "1.6" }}>{product.description}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
