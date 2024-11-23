"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const placeholderEvents = [
  //the actual events will have more details
  { id: "event-1", title: "Event 1", description: "Description for Event 1" },
  { id: "event-2", title: "Event 2", description: "Description for Event 2" },
  { id: "event-3", title: "Event 3", description: "Description for Event 3" },
];

// Function to handle accept event
const handleAccept = (eventId: string) => {
  console.log("Accepted event with ID:", eventId);
  // Add your accept logic here (e.g., update state or UI)
};

// Function to handle reject event
const handleReject = (eventId: string) => {
  console.log("Rejected event with ID:", eventId);
  // Add your reject logic here (e.g., update state or UI)
};

export default function AdminPage() {
  return (
    <div style={{ padding: "2px" }}>
      <h1 className="text-xl font-bold pt-3 pb-3">Admin Panel</h1>
      <p>All the pending events are below:</p>

      <Accordion type="single" collapsible>
        {placeholderEvents.map((event) => (
          <AccordionItem key={event.id} value={event.id}>
            <AccordionTrigger>{event.title}</AccordionTrigger>{" "}
            {/* Display the event title */}
            <AccordionContent>
              <p>{event.description}</p> {/* Display the event description */}
              <div className="flex justify-between mt-4">
                {" "}
                {/* Flex container for buttons */}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(event.id)} // Accept button
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(event.id)} // Reject button
                >
                  Reject
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
