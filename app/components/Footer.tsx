import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg">Contact Information</h4>
            <p>Office Hours: 9am - 5pm</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: contact@olemiss.edu</p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h4 className="font-bold text-lg">Quick Links</h4>
            {/* Ensure there's no <a> tag inside Link */}
            <Link href="/about">
              <span className="hover:underline cursor-pointer">About Us</span>
            </Link>
            <Link href="/contact">
              <span className="hover:underline cursor-pointer">Contact</span>
            </Link>
            <Link href="/terms">
              <span className="hover:underline cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
