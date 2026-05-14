import css from "./ProfilePage.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

const DEFAULT_AVATAR =
  "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();
  return {
    title: `Profile of ${user.username}`,
    description: "User profile page in NoteHub application.",
    openGraph: {
      title: `Profile of ${user.username}`,
      description: "User profile page in NoteHub application.",
      url: `https://notehub.com/profile/${user.username}`,
      siteName: "NoteHub",
      images: [
        {
          url: user.avatar || DEFAULT_AVATAR,
        },
      ],
      type: "website",
    },
  };
}

export default async function Profile() {
  const user = await getMe();
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar || DEFAULT_AVATAR}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}
