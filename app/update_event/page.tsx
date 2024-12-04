"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext"; // Adjust path as needed
import { db } from "@/config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateEvent() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    start: "",
    details: "",
    buildingName: "",
    roomNumber: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters
  const eventId = searchParams.get("eventId"); // Extract eventId from URL

  useEffect(() => {
  // Fetch the event details when the page loads
  const fetchEventDetails = async () => {
    if (!eventId) {
      console.error("No eventId provided");
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        const eventData = eventSnapshot.data() as {
          eventName: string;
          date: string;
          start: string;
          details: string;
          buildingName: string;
          roomNumber: string;
        };

        setFormData(eventData);
      } else {
        console.error("Event does not exist");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  fetchEventDetails();
}, [eventId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        ...formData,
        isApproved: false,
        updatedAt: new Date(), // Track when the event was updated
      });

      console.log("Event updated:", formData);
      router.push("/calendar"); // Redirect to calendar or any other page
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Update Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eventName" className="block text-lg font-medium">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]} // Sets min to tomorrow's date
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-lg font-medium">Time</label>
            <input
              type="time"
              id="start"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="buildingName" className="block text-lg font-medium">Building Name</label>
            <input
              type="text"
              id="buildingName"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="roomNumber" className="block text-lg font-medium">Room Number</label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-lg font-medium">Event Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
