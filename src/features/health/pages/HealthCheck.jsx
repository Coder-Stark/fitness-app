import { useEffect, useState } from "react";
import api from "../../../shared/api/axios";

export default function HealthCheck() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setStatus(res.data.status))
      .catch((err) => {
        console.error("Health check failed:", err);
        setStatus(`failed: ${err.message}`);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="mt-2">Backend status: {status}</p>
    </div>
  );
}