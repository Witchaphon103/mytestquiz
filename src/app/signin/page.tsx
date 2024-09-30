"use client";

import { Typography, Stack, TextField, Button, Link, Alert } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!res?.error) {
        // Redirect to dashboard or another page after successful login
        router.push("/dashboard");  // Replace "/dashboard" with the path you want to navigate to
      } else {
        setError("Invalid email or password.");
      }
    } catch (e) {
      setError("An error occurred while signing in.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h1" textAlign="center">Sign In</Typography>

      <Stack justifyContent="center" alignItems="center" marginTop={2}>
        <Link href="/signup" variant="body2">
          Sign up here
        </Link>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack
          width={400}
          justifyContent="center"
          alignItems="center"
          margin="auto"
          spacing={2}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Stack>
      </form>
    </>
  );
}
