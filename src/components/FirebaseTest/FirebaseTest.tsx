import { useEffect, useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "../../lib/firebase";

export function FirebaseTest() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);

    signInAnonymously(auth)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        setError(error.message);
      });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Firebase Connection Test</h2>
      {status === "loading" && <p>Testing Firebase connection...</p>}
      {status === "success" && (
        <p className="text-green-600">✓ Firebase connection successful!</p>
      )}
      {status === "error" && (
        <p className="text-red-600">✗ Firebase connection failed: {error}</p>
      )}
    </div>
  );
}
