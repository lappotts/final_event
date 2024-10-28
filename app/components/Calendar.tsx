// app/components/Calendar.tsx
"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export default function Calendar({ events }) {
  const calendarEvents = events.map(event => ({
    title: event.title,
    start: `${event.date}T${event.start}`, // Combine date and start time
    end: `${event.date}T${event.end}` // Combine date and end time
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents} // Use the mapped events
    />
  );
}
