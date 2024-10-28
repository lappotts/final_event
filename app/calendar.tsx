import Calendar from '../components/Calendar';

export default function CalendarPage() {
  const events = [
    { title: 'Conference', date: '2023-10-22', startTime: '10:00', endTime: '12:00' },
    { title: 'Workshop', date: '2023-10-24', startTime: '14:00', endTime: '15:30' },
    // ...more events
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <Calendar events={events} />
    </div>
  );
}
