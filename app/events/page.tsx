"use client";
import { useAuth } from "@/context/AuthContext";
import AdminPage from "./sub-pages/admin-page";
import WorkerPage from "./sub-pages/worker-page";
import RegularUserPage from "./sub-pages/regular-user-page";
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
          <AdminPage />
        ) : user.isStaff ? (
          <WorkerPage />
        ) : (
          <RegularUserPage />
        )}
      </div>

      <Footer />
    </div>
  );
}
