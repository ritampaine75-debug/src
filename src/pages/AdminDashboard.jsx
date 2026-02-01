import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container animate-in">
      <h2>Admin Dashboard</h2>
      <div className="grid grid-2" style={{ marginTop: '2rem' }}>
        <Link to="/admin/add-product" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="fa-solid fa-plus fa-3x" style={{ marginBottom: '1rem', color: 'var(--primary)' }}></i>
          <h3>Add Product</h3>
        </Link>
        <Link to="/admin/orders" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="fa-solid fa-list-check fa-3x" style={{ marginBottom: '1rem', color: 'var(--accent)' }}></i>
          <h3>Manage Orders</h3>
        </Link>
      </div>
    </div>
  );
}
