"use client";

import Header from '../components/Header';
import Calendar from '../components/Calendar';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext"; // Adjust the path if needed

export default function CalendarPage() {
  const { user } = useAuth(); // Access the logged-in user
  const [events, setEvents] = useState<{ title: string; date: string; start: string; end: string }[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Query to fetch only approved events (no longer restricted to the logged-in user)
        const eventsCollection = collection(db, "events");
        const approvedEventsQuery = query(
          eventsCollection,
          where("isApproved", "==", true) // Fetch only approved events
        );
        const eventsSnapshot = await getDocs(approvedEventsQuery);

        const eventsData = eventsSnapshot.docs.map(doc => {
          const event = doc.data();
          return {
            title: event.eventName || 'Untitled Event',
            date: event.date,
            start: event.start || '00:00',
            end: event.end || '23:59',
          };
        });

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">All Approved Events</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}

