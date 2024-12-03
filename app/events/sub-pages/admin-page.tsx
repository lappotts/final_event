"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/config/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

interface Event {
  id: string;
  eventName: string;
  details: string;
  isApproved: boolean;
  workers: string[]; // Array of worker user IDs
}

interface Worker {
  id: string;
  firstName: string;
  lastName: string;
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workerMap, setWorkerMap] = useState<Record<string, Worker>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("isApproved", "==", false));
        const querySnapshot = await getDocs(q);

        const fetchedEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          workers: [],
          ...doc.data(),
        })) as unknown as Event[];

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("isStaff", "==", true));
        const querySnapshot = await getDocs(q);

        const fetchedWorkers: Worker[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Worker[];

        setWorkers(fetchedWorkers);

        const workerMap = fetchedWorkers.reduce(
          (acc, worker) => ({ ...acc, [worker.id]: worker }),
          {}
        );
        setWorkerMap(workerMap);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleAssignWorker = async (eventId: string, workerId: string) => {
    try {
      // Update the event's workers array
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        workers: arrayUnion(workerId),
      });

      // Update the worker's assigned events array
      const workerRef = doc(db, "users", workerId);
      await updateDoc(workerRef, {
        assignedEvents: arrayUnion(eventId),
      });

      // Update local state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, workers: [...event.workers, workerId] }
            : event
        )
      );

      console.log(`Worker ${workerId} assigned to event ${eventId}`);
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  const handleUnassignWorker = async (eventId: string, workerId: string) => {
    try {
      // Remove the worker from the event's workers array
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        workers: arrayRemove(workerId),
      });

      // Remove the event ID from the worker's assigned events array
      const workerRef = doc(db, "users", workerId);
      await updateDoc(workerRef, {
        assignedEvents: arrayRemove(eventId),
      });

      // Update local state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, workers: event.workers.filter((id) => id !== workerId) }
            : event
        )
      );

      console.log(`Worker ${workerId} unassigned from event ${eventId}`);
    } catch (error) {
      console.error("Error unassigning worker:", error);
    }
  };

  const handleAccept = async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { isApproved: true });
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
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Assign Workers</h3>
                <ul className="mt-2">
                  {workers.map((worker) => (
                    <li key={worker.id} className="flex justify-between items-center mb-2">
                      <span>
                        {worker.firstName} {worker.lastName}
                      </span>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleAssignWorker(event.id, worker.id)}
                      >
                        Assign
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Assigned Workers:</h3>
                <ul className="mt-2">
                  {event.workers.length > 0 ? (
                    event.workers.map((workerId) => (
                      <li key={workerId} className="flex justify-between items-center">
                        <span>
                          {workerMap[workerId]
                            ? `${workerMap[workerId].firstName} ${workerMap[workerId].lastName}`
                            : "Worker not found"}
                        </span>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleUnassignWorker(event.id, workerId)}
                        >
                          Unassign
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>No workers assigned</li>
                  )}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
