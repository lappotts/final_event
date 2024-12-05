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
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  eventName: string;
  date: string;
  details: string;
  start: string;       // Start time
  buildingName: string; // Building name
  roomNumber: string;   // Room number
}

export default function RegularUserPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user || !user.uid) {
        console.error("User not logged in");
        return;
      }

      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("createdBy", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          eventName: doc.data().eventName,
          date: doc.data().date,
          details: doc.data().details,
          start: doc.data().start,          // New field
          buildingName: doc.data().buildingName, // New field
          roomNumber: doc.data().roomNumber, // New field
        })) as Event[];

        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [user]);

  const handleUpdateEvent = (eventId: string) => {
    router.push(`/update_event?eventId=${eventId}`);
  };

  return (
    <div style={{ padding: "2px" }}>
      <h1 className="text-xl font-bold pt-3 pb-3">Your Events</h1>
      <p>All your events are listed below:</p>

      <Accordion type="single" collapsible>
        {events.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.eventName}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Details:</strong> {event.details}</p>
              <p><strong>Start Time:</strong> {event.start}</p>  {/* Display start time */}
              <p><strong>Building Name:</strong> {event.buildingName}</p> {/* Display building name */}
              <p><strong>Room Number:</strong> {event.roomNumber}</p>  {/* Display room number */}
              <div className="flex mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleUpdateEvent(event.id)}
                >
                  Update Event
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

