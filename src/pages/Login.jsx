import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Failed to login");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="card animate-in">
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          New here? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
