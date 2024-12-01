// app/about_us/page.tsx
"use client";

// import statements
import React from "react";
import Header from ".././components/Header";
import Footer from "../components/Footer";
import { List } from "@mui/material";
// import "../styles.css";

// function to display "About Us" information
export default function AboutUsPage() {
    return (        
    <div style={{ padding: "20px" }}>
    <Header/>
    <h3 className="text-2xl font-bold m-5">About Us</h3>
    <h4 className="m-5"><strong>Meta-04</strong></h4>
    <h2 className="m-5">We are a team of four CS students. This is our CS 387 class project.</h2><br/>
    <h5 className="m-5"><strong>Team Members</strong></h5>
    <ul>
        <li className="m-5">- Sushmita Halder</li>
        <li className="m-5">- Stephen Igboka</li>
        <li className="m-5">- Jacob Miller</li>
        <li className="m-5">- Layton Potts</li>
    </ul>    
    </div>
    );
}