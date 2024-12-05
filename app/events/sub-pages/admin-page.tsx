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
  date: string;
  time: string;
  buildingName: string;
  buildingNumber: string;
  isApproved: boolean;
  workers: string[];
}

interface Worker {
  id: string;
  firstName: string;
  lastName: string;
}

export default function AdminPage() {
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workerMap, setWorkerMap] = useState<Record<string, Worker>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");

        // Fetch pending events
        const pendingQuery = query(eventsRef, where("isApproved", "==", false));
        const pendingSnapshot = await getDocs(pendingQuery);
        const fetchedPendingEvents: Event[] = pendingSnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: doc.id || "",
            workers: [],
            eventName: eventData.eventName || "",
            details: eventData.details || "",
            date: eventData.date || "",
            time: eventData.time || "",
            buildingName: eventData.buildingName || "",
            buildingNumber: eventData.buildingNumber || "",
            isApproved: eventData.isApproved || false,
            ...eventData,
          };
        });
        setPendingEvents(fetchedPendingEvents);

        // Fetch all approved events
        const approvedQuery = query(eventsRef, where("isApproved", "==", true));
        const approvedSnapshot = await getDocs(approvedQuery);
        const fetchedAllEvents: Event[] = approvedSnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: doc.id || "",
            workers: [],
            eventName: eventData.eventName || "",
            details: eventData.details || "",
            date: eventData.date || "",
            time: eventData.time || "",
            buildingName: eventData.buildingName || "",
            buildingNumber: eventData.buildingNumber || "",
            isApproved: eventData.isApproved || false,
            ...eventData,
          };
        });
        setAllEvents(fetchedAllEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("isStaff", "==", true));
        const querySnapshot = await getDocs(q);

        const fetchedWorkers: Worker[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            ...data,
          };
        });
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

    fetchEvents();
    fetchWorkers();
  }, []);

  const handleAssignWorker = async (eventId: string, workerId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        workers: arrayUnion(workerId),
      });

      const workerRef = doc(db, "users", workerId);
      await updateDoc(workerRef, {
        assignedEvents: arrayUnion(eventId),
      });

      setAllEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? { ...event, workers: [...(event.workers || []), workerId] }
            : event
        )
      );

      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== workerId)
      );

      console.log(`Worker ${workerId} successfully assigned to event ${eventId}`);
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  const handleUnassignWorker = async (eventId: string, workerId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        workers: arrayRemove(workerId),
      });

      const workerRef = doc(db, "users", workerId);
      await updateDoc(workerRef, {
        assignedEvents: arrayRemove(eventId),
      });

      setAllEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                workers: event.workers.filter((id) => id !== workerId),
              }
            : event
        )
      );

      const workerToUnassign = workerMap[workerId];
      if (workerToUnassign && !workers.some((w) => w.id === workerId)) {
        setWorkers((prevWorkers) => [...prevWorkers, workerToUnassign]);
      }

      console.log(`Worker ${workerId} successfully unassigned from event ${eventId}`);
    } catch (error) {
      console.error("Error unassigning worker:", error);
    }
  };

  const handleAcceptEvent = async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { isApproved: true });

      const approvedEvent = pendingEvents.find((event) => event.id === eventId);
      if (approvedEvent && approvedEvent.id) {
        const eventToUpdate = { ...approvedEvent, isApproved: true };
        setAllEvents((prevEvents) => [
          ...prevEvents.filter((event) => event.id !== eventId),
          eventToUpdate,
        ]);
      }

      setPendingEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );

      console.log("Event approved:", eventId);
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);

      setAllEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      setPendingEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));

      console.log("Event deleted:", eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-6">Admin Panel</h1>

      {/* Pending Events Section */}
      <h2 className="text-xl font-semibold mb-4">Pending Events</h2>
      <Accordion type="single" collapsible>
        {pendingEvents && pendingEvents.length > 0 ? (
          pendingEvents.map((event) => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger>{event.eventName}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{event.details}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Building Name:</strong> {event.buildingName}</p>
                <p><strong>Building Number:</strong> {event.buildingNumber}</p>

                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-500 text-white px-6 py-3 rounded text-lg"
                    onClick={() => handleAcceptEvent(event.id)}
                  >
                    Approve Event
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-3 rounded text-lg"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete Event
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p>No pending events found.</p>
        )}
      </Accordion>

      {/* Approved Events Section */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Approved Events</h2>
      <Accordion type="single" collapsible>
        {allEvents && allEvents.length > 0 ? (
          allEvents.map((event) => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger>{event.eventName}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{event.details}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Building Name:</strong> {event.buildingName}</p>
                <p><strong>Building Number:</strong> {event.buildingNumber}</p>

                <div className="mt-4">
                  <h3 className="font-semibold">Assigned Workers</h3>
                  <ul>
                    {event.workers.map((workerId) => {
                      const worker = workerMap[workerId];
                      return (
                        <li key={workerId} className="flex justify-between items-center">
                          <span>{worker?.firstName} {worker?.lastName}</span>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleUnassignWorker(event.id, workerId)}
                          >
                            Unassign
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold">Available Workers</h3>
                  <ul>
                    {workers
                      .filter((worker) => !event.workers.includes(worker.id))
                      .map((worker) => (
                        <li key={worker.id} className="flex justify-between items-center">
                          <span>{worker.firstName} {worker.lastName}</span>
                          <button
                            className="bg-blue-500 text-white px-6 py-2 rounded"
                            onClick={() => handleAssignWorker(event.id, worker.id)}
                          >
                            Assign
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete Event
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p>No approved events found.</p>
        )}
      </Accordion>
    </div>
  );
}


