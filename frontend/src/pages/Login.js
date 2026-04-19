import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/admin/login", form);

    localStorage.setItem("token", res.data.token);

    window.location.href = "/admin";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Admin Login</h1>

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Password" type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;