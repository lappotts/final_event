"use client";
import { useAuth } from "@/context/AuthContext";
import AdminPage from "./sub-pages/admin-page";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function events() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        {user.isAdmin ? (
          // <p>Welcome, Admin! Here is the admin panel.</p>
          <div>
            <AdminPage />
          </div>
        ) : (
          <p>Welcome, User! Here is the standard user content.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
