"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext"; // Adjust the path if needed

export default function CalendarPage() {
  const { user } = useAuth(); // Access the logged-in user
  const [events, setEvents] = useState<any[]>([]); // Store events
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // State for selected event

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const userEventsQuery = query(
          eventsCollection,
          where("isApproved", "==", true)
        );
        const eventsSnapshot = await getDocs(userEventsQuery);

        const eventsData = eventsSnapshot.docs.map(doc => {
          const event = doc.data();
          return {
            id: doc.id, // Assuming each event has an ID
            title: event.eventName || 'Untitled Event',
            date: event.date,
            start: event.start || '00:00',
            roomNumber: event.roomNumber || 'Unknown Room',
            buildingName: event.buildingName || 'Unknown Building',
            details: event.details || 'No details available',
          };
        });

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event); // Set the clicked event details
  };

  const closeEventPopOut = () => {
    setSelectedEvent(null); // Close the pop-out
  };

  return (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">All Events</h1>
        <Calendar events={events} onEventClick={handleEventClick} />
      </div>

      {/* Event details pop-out */}
      {selectedEvent && (
        <div
          className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-50"
          style={{ zIndex: 50 }} // Ensure pop-out is in front of the calendar
        >
          <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Start Time:</strong> {selectedEvent.start}</p>
          <p><strong>Room:</strong> {selectedEvent.roomNumber}</p>
          <p><strong>Building:</strong> {selectedEvent.buildingName}</p>
          <p><strong>Details:</strong> {selectedEvent.details}</p>
          <button
            onClick={closeEventPopOut}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}


