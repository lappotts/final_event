// app/components/Header.tsx
import Link from "next/link";

export default function Header() {
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
          <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
            <Link href="/events" className="hover:underline">
              Events
            </Link>
          </li>
          <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
            <Link href="/schedule_event" className="hover:underline">
              Plan Your Visit
            </Link>
          </li>
          <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
            <Link href="/calendar" className="hover:underline">
              Events Calendar
            </Link>
          </li>
          <li style={{ marginRight: "1.5rem", fontSize: "1.15rem" }}>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li style={{ fontSize: "1.15rem" }}>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
