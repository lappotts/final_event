"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/config/firebase.config";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Define the structure of the event data
interface Event {
  id: string;
  eventName: string;
  details: string;
  isApproved: boolean;
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch unapproved events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("isApproved", "==", false));
        const querySnapshot = await getDocs(q);
        
        const fetchedEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Function to approve an event
  const handleAccept = async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { isApproved: true });
      // Update UI by removing the approved event from the list
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      console.log("Event approved:", eventId);
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleReject = async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);
      // Update UI by removing the rejected event from the list
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      console.log("Event rejected and deleted:", eventId);
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  return (
    <div style={{ padding: "2px" }}>
      <h1 className="text-xl font-bold pt-3 pb-3">Admin Panel</h1>
      <p>All the pending events are below:</p>

      <Accordion type="single" collapsible>
        {events.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.eventName}</AccordionTrigger>
            <AccordionContent>
              <p>{event.details}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(event.id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(event.id)}
                >
                  Reject
                </button>
                {/* Add other actions here if needed */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
