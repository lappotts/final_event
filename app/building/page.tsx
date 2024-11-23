// src/app/buildings/page.tsx
"use client";

import React from "react";
import BuildingForm from "./BuildingForm";
import Header from ".././components/Header";
import Footer from "../components/Footer";
// import "../styles.css";

const buildings = [
  { name: "Weir Hall", image: "weir.jpg" },
  { name: "Conner Hall", image: "conner.jpg" },
  { name: "Pavillion", image: "pavillion.jpg" },
  { name: "Lamar Hall", image: "lamar.jpg" },
];

const BuildingsPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h3 className="text-2xl font-bold m-5">Available Buildings for Events</h3>
      <BuildingForm buildings={buildings} />
      <Footer />
    </div>
  );
};

export default BuildingsPage;
