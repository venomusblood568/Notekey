import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/signin");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          date: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup error");
    }
  };

  function loginWithRedirect(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center space-y-6">
      <h2 className="text-3xl font-bold">Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-500 bg-black rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-500 bg-black rounded"
      />

      <button
        onClick={handleSignup}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Signup with Email
      </button>

      <div className="text-gray-400">or</div>

      <button
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
