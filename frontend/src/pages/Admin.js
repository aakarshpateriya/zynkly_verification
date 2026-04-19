import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [cleaners, setCleaners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    photo: ""
  });

  const fetchCleaners = async () => {
    const res = await axios.get("http://localhost:5000/api/cleaner/all");
    setCleaners(res.data);
  };

  useEffect(() => {
    fetchCleaners();
  }, []);

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/cleaner/add", form);
    setForm({ name: "", phone: "", photo: "" });
    fetchCleaners();
  };

  const toggleStatus = async (id) => {
    await axios.put(`http://localhost:5000/api/cleaner/toggle/${id}`);
    fetchCleaners();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zynkly Admin Panel</h1>

      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Phone" value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })} />

      <input placeholder="Photo URL" value={form.photo}
        onChange={e => setForm({ ...form, photo: e.target.value })} />

      <button onClick={handleAdd}>Add Cleaner</button>

      <hr />

      {cleaners.map(c => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{c.name}</h3>
          <p>{c.phone}</p>
          <p>ID: {c.cleanerId}</p>
          <p>Status: {c.isActive ? "Active" : "Inactive"}</p>

          <button onClick={() => toggleStatus(c._id)}>
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;