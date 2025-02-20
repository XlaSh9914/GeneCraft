import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input, Button, Link } from "@heroui/react"; 

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch("http://localhost:5000/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("userID", JSON.stringify(data.userId));
        setMessage("Login successful! Redirecting...");
        navigate("/home");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Try again later.");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen py-8 md:py-10">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className={title()}>Welcome Back</h1>
            <h2 className={subtitle()}>Sign in to continue your journey with GeneCraft.</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row flex-wrap gap-4">
              <Input
                fullWidth
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                size="lg"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                fullWidth
                type="password"
                label="Password"
                placeholder="Enter your password"
                size="lg"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button color="default" fullWidth size="lg" type="submit">
              Sign In
            </Button>
          </form>
          {message && <p className="text-center text-sm text-red-600">{message}</p>}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" color="foreground">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}