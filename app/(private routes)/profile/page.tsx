import css from "./ProfilePage.module.css";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page in NoteHub application.",
  openGraph: {
    title: "Profile | NoteHub",
    description: "User profile page in NoteHub application.",
    url: "https://your-site.vercel.app/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
    type: "website",
  },
};

export default function ProfilePage() {
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <a href="" className={css.editProfileButton}>
              Edit Profile
            </a>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: Luidmyla Skopenko</p>
            <p>Email: luda.skopenko80@gmail.com</p>
          </div>
        </div>
      </main>
    </>
  );
}
