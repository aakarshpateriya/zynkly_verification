import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [cleaners, setCleaners] = useState([]);
  const [scans, setScans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    photo: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchCleaners();
      fetchScans();
    }
  }, []);

  const config = {
    headers: {
      Authorization: token
    }
  };

  const fetchCleaners = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cleaner/all",
        config
      );
      setCleaners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchScans = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cleaner/scans",
        config
      );
      setScans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cleaner/add",
        form,
        config
      );
      setForm({ name: "", phone: "", photo: "" });
      fetchCleaners();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/cleaner/toggle/${id}`,
        {},
        config
      );
      fetchCleaners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Zynkly Admin Panel</h1>

      {/* Add Cleaner */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Photo URL"
        value={form.photo}
        onChange={e => setForm({ ...form, photo: e.target.value })}
      />

      <button onClick={handleAdd}>Add Cleaner</button>

      <hr />

      {/* Cleaners List */}
      <h2>Cleaners</h2>
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

      <hr />

      {/* Scan Logs */}
      <h2>Scan Logs</h2>
      {scans.map((s, i) => (
        <div key={i} style={{ border: "1px solid blue", margin: "10px", padding: "10px" }}>
          <p>Cleaner ID: {s.cleanerId}</p>
          <p>Time: {new Date(s.scannedAt).toLocaleString()}</p>
          <p>IP: {s.ip}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;