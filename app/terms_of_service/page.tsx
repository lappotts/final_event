 // app/terms_of_service/page.tsx
"use client";

// import statements
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// function to display terms of service
export default function terms_of_service() {
    return (
<div style={{ padding: "20px" }}>
      <Header />
      <h3 className="text-2xl font-bold m-5">Event Center Terms of Service</h3>
      <h5>Click here to see our terms of service document</h5>
    </div>
    );
}