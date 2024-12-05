// app/components/Calendar.tsx
"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  id: string;
  title: string;
  date: string; // Format: "YYYY-MM-DD"
  start: string; // Format: "HH:mm:ss"
  roomNumber: string;
  buildingName: string;
  details: string;
}

interface CalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
  const calendarEvents = events.map(event => ({
    title: event.title,
    start: `${event.date}T${event.start}`, // Combine date and start time
    eventData: event // Pass the whole event data to FullCalendar
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents} // Use the mapped events
      eventClick={info => onEventClick(info.event)} // Handle event click
      eventRender={(info) => {
        const eventElement = info.el;
        eventElement.style.cursor = 'pointer'; // Change the cursor to pointer on hover
      }}
    />
  );
}
