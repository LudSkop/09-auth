"use client";

import css from "@/app/(auth routes)/sign-up/SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import type { RegisterRequest } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function SingUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError("");
      const values = Object.fromEntries(formData) as RegisterRequest;
      const user = await register(values);

      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
