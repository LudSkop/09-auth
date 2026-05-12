"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const isAuthenticted = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {isAuthenticted && (
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
      )}
      {isAuthenticted && user && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>User email</p>
          <button className={css.logoutButton}>Logout</button>
        </li>
      )}
      {!isAuthenticted && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
