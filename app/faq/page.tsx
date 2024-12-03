// app/faq/page.tsx

import Footer from "../components/Footer";
import Header from "../components/Header";
import FAQform from "./faqForm";

export default function FAQPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <Header />
      <h3 className="text-2xl font-bold mt-6 mb-4 ">
        Frequently Asked Questions
      </h3>
      <div className="flex-grow">
        <FAQform />
      </div>

      <Footer />
    </div>
  );
}
