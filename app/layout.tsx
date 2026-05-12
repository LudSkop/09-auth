import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "normalize.css";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Note Management App",
  description:
    "Organize, manage, and access your notes effortlessly with NoteHub.",
  openGraph: {
    title: "NoteHub - Your Personal Note Management App",
    description:
      "Organize, manage, and access your notes effortlessly with NoteHub. Create, edit, and categorize your notes in one convenient place.",
    url: "https://notehub.app",
    siteName: "NoteHub",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
