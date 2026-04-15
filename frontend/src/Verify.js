import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Verify() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cleaner/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!data) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {data.verified ? (
        <>
          <h1 style={{ color: "green" }}>✅ Verified</h1>
          <img src={data.photo} alt="cleaner" width="150" />
          <h2>{data.name}</h2>
          <p>{data.phone}</p>
        </>
      ) : (
        <h1 style={{ color: "red" }}>❌ Not Verified</h1>
      )}
      </div>
  );
}

export default Verify;