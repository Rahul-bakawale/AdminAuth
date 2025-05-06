import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import InputField from "../common/InputField";
import Spinner from "react-bootstrap/Spinner";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "abhi@diginow.co.uk",
    password: "admin123",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const data = await response.json();
        localStorage.setItem("admin-token", data.token);
        toast.success("Login successful");
        router.push("/products/product-list");
      } catch (err) {
        toast.error(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [formData, router]
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Login</h2>
      <form
        onSubmit={handleLogin}
        className="mx-auto border p-4 rounded shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="form-control"
          required
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="form-control"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3 d-flex justify-content-center align-items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
