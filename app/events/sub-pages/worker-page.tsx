"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/config/firebase.config";
import { useAuth } from "@/context/AuthContext"; // Adjust the path as needed
import { collection, getDocs, query, where } from "firebase/firestore";

interface Event {
  id: string;
  eventName: string;
  date: string;
  details: string;
  building: string;  // New field for building
  time: string;      // New field for time
  roomNumber: string; // New field for room number
}

export default function WorkerPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchWorkerEvents = async () => {
      if (!user || !user.uid) {
        console.error("User not logged in");
        return;
      }

      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("workers", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);

        const workerEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          eventName: doc.data().eventName,
          date: doc.data().date,
          details: doc.data().details,
          building: doc.data().building,  // New field
          time: doc.data().time,          // New field
          roomNumber: doc.data().roomNumber, // New field
        })) as Event[];

        setEvents(workerEvents);
      } catch (error) {
        console.error("Error fetching worker events:", error);
      }
    };

    fetchWorkerEvents();
  }, [user]);

  return (
    <div style={{ padding: "2px" }}>
      <h1 className="text-xl font-bold pt-3 pb-3">Your Assigned Events</h1>
      <p>All the events you are assigned to are listed below:</p>

      <Accordion type="single" collapsible>
        {events.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.eventName}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Details:</strong> {event.details}</p>
              <p><strong>Building:</strong> {event.building}</p>  {/* Display building */}
              <p><strong>Time:</strong> {event.time}</p>          {/* Display time */}
              <p><strong>Room Number:</strong> {event.roomNumber}</p> {/* Display room number */}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

