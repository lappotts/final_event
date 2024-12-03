"use client";

import { Button } from "@/components/ui/button";
// app/components/Header.tsx
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import router from "next/router";

export default function Header() {
  const { user, logOut } = useAuth();
  const isUserLoggedIn = !!user;

  return (
    <header className="bg-white text-black py-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/images/olemiss.png"
              alt="Event Center Logo"
              className="h-10 w-auto"
            />
            <span
              style={{ color: "black", fontSize: "1.25rem" }}
              className="text-lg font-bold ml-2" // Added margin to the left of the text for spacing
            >
              Ole Miss Event Center
            </span>
          </Link>
        </div>

        {/* Navigation links on the right */}
        <ul className="flex">
          {isUserLoggedIn && (
            <>
              <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/events" className="hover:underline">
                  Events
                </Link>
              </li>
              {/* <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/plan-your-visit" className="hover:underline">
                  Plan Your Visit
                </Link>
              </li> */}
              <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/calendar" className="hover:underline">
                  Calendar
                </Link>
              </li>
              <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/about_us" className="hover:underline">
                  About
                </Link>
              </li>
              <Button
                onClick={async () => {
                  try {
                    await logOut(); // Log the user out
                    router.push("/login"); // Redirect to the login page
                  } catch (error: any) {
                    console.error("Logout failed:", error.message); // Handle errors
                  }
                }}
                style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}
              >
                Logout
                {
                  // convert this to Buttonnk button (see shadcn) and call signout method from above
                }
              </Button>
              <div className="mr-[1.15rem] ">Hi, {user.firstName}</div>
            </>
          )}

          {!isUserLoggedIn && (
            <>
              <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
