import { useState } from "react";
import { uploadImage } from "../services/imgbbService";
import { db } from "../services/firebase";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", price: "", category: "", description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);
      await set(push(ref(db, 'products')), {
        ...form,
        price: parseFloat(form.price),
        imageUrl,
        createdAt: new Date().toISOString()
      });
      alert("Product Added!");
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-in">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="card" style={{ marginTop: '1rem' }}>
        <input placeholder="Title" required onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Price" type="number" required onChange={e => setForm({...form, price: e.target.value})} />
        <select required onChange={e => setForm({...form, category: e.target.value})}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
        </select>
        <textarea placeholder="Description" required onChange={e => setForm({...form, description: e.target.value})} />
        <input type="file" required onChange={e => setImage(e.target.files[0])} accept="image/*" />
        <button disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
