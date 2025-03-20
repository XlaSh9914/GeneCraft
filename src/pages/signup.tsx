import { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { title, subtitle } from "../components/primitives";
import DefaultLayout from "../layouts/default";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");

      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem("userID", JSON.stringify(data.userId));
        // Redirect to login page or show success message
        navigate("/test");
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen py-8 md:py-10">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className={title()}>Create Your Account</h1>
            <h2 className={subtitle()}>
              Join GeneCraft and unlock the world of bioinformatics.
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row flex-wrap gap-4">
              <Input
                fullWidth
                required
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                size="lg"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                fullWidth
                required
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                size="lg"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                fullWidth
                required
                label="Password"
                name="password"
                placeholder="Enter your password"
                size="lg"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                size="lg"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button
              fullWidth
              color="primary"
              disabled={loading}
              size="lg"
              type="submit"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link color="foreground" href="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
