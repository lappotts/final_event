// app/available_spaces/page.tsx
"use client";

import React from "react";
import BuildingForm from "./BuildingForm";
import Header from ".././components/Header";
import Footer from "../components/Footer";
// import "../styles.css";

// buildings with images
const buildings = [
  { name: "Weir Hall", image: "weir.jpg" },
  { name: "Conner Hall", image: "conner.jpg" },
  { name: "Student Union", image: "union.jpg" },
];

const BuildingsPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h3 className="text-2xl font-bold m-5">Available Spaces</h3>
      <BuildingForm buildings={buildings} />
      <Footer />
    </div>
  );
};

export default BuildingsPage;