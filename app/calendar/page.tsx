// app/calendar/page.tsx
import Header from '../components/Header.tsx';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  const events = [
  { title: 'Placeholder', date: '2024-10-22', start: '10:00', end: '12:00' },
  { title: 'Placeholder', date: '2024-10-23', start: '14:00', end: '15:00' },
  { title: 'Placeholder', date: '2024-10-24', start: '09:00', end: '11:00' },
];


  return (
    <div>
      <Header /> {/* Add the Header here */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
}
