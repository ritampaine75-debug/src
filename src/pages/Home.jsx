import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { ref, onValue } from "firebase/database";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedProducts = [];
      for (const key in data) {
        loadedProducts.push({ id: key, ...data[key] });
      }
      setProducts(loadedProducts);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p => 
    (filter === "All" || p.category === filter) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={filter === cat ? "btn btn-primary" : "btn btn-secondary"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? <p>Loading products...</p> : (
        <div className="grid grid-2">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
