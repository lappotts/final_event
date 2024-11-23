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
      if (!user || !user.uid) {
        console.error("User not logged in");
        return;
      }

      try {
        // Query to fetch only approved events created by the logged-in user
        const eventsCollection = collection(db, "events");
        const userEventsQuery = query(
          eventsCollection,
          where("isApproved", "==", true),
          where("createdBy", "==", user.uid) // Filter by the current user's UID
        );
        const eventsSnapshot = await getDocs(userEventsQuery);

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
        <h1 className="text-3xl font-bold mb-4">My Events</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}
