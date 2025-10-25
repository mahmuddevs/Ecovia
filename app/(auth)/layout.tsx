import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Auth",
  description: "abcdd",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}
