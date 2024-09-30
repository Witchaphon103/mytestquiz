"use client";
import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import React, { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Both fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ email: "", password: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed");
      }
    } catch (e) {
      setError("An error occurred while signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h1" textAlign="center">Signup Page</Typography>

      <form onSubmit={handleSubmit}>
        <Stack
          width={400}
          justifyContent="center"
          alignItems="center"
          margin="auto"
          spacing={2}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Signup successful!</Alert>}
          
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
            name="password"
            label="Password"
            type="password"
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
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Link href="/signin">
            <Button variant="outlined" color="secondary" fullWidth>
              Back to Sign In
            </Button>
          </Link>
        </Stack>
      </form>
    </>
  );
}
