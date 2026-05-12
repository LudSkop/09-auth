import css from "./Home.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "Unfortunately, this page does not exist or has been moved. Check the URL or return to the home page.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description:
      "The requested page does not exist. Check the address or return to NoteHub to view your notes.",
    url: "https://08-zustand.vercel.app",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
