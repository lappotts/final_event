// src/app/buildings/page.tsx
"use client";

import React from "react";
import BuildingForm from "./BuildingForm";
import Header from ".././components/Header";
import Footer from "../components/Footer";
import { description } from "../login/LoginForm";
// import "../styles.css";

// Name, image, and description of event venues
const buildings = [
  { name: "Weir Hall", image: "weir.jpg", description: "Has 7 computer labs, two classrooms, and a lounge" },
  { name: "Conner Hall", image: "conner.jpg", description: "Has multiple clasrooms and lounges" },
  { name: "Pavillion", image: "pavillion.jpg", description: "Has multiple lounges that can host events" },
  { name: "Lamar Hall", image: "lamar.jpg", description: "Has multiple classrooms that can be used to host seminars" },
  { name: "Ventress Hall", image: "ventress.jpg", description: "Has a few classrooms" },
  { name: "Student Union", image: "union.jpg", 
    description: "Has multiple rooms of varying sizes, a food court, and a large ballroom" },
];

const BuildingsPage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h3 className="text-2xl font-bold m-5">On-Campus Buildings for Events</h3>
      <BuildingForm buildings={buildings} />
      <Footer />
    </div>
  );
};

export default BuildingsPage;
