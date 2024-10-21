// app/page.tsx
import Header from './components/Header';
import Footer from './components/Footer'; 
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header at the top */}
      <Header />

      {/* Large image section with text overlay */}
      <div className="relative w-full" style = {{ height: '725px' }} >
        <img
          src="/images/building.png" 
          alt="Event Center"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <h1 style={{ color: 'white', fontSize: '2rem' }} className="text-lg font-bold text-center">
            Welcome to the Ole Miss Event Center
          </h1>
          <h2 style={{ color: 'white', fontSize: '1.5rem' }} className="font-semibold text-center mt-2">
            Let us host your next on campus event
          </h2>
        </div>
      </div>

      {/* Additional content below the image */}
      <main className="p-6">
        <section className="text-center mt-8">
          <p style={{ color: 'black', fontSize: '2rem', marginTop: '2rem', marginBottom: '1.5rem' }} className="text-lg">
            We help you find the perfect venue for your events and manage them efficiently.
          </p>
          <Link href="/event-calendar">
            <button style = {{backgroundColor: 'lightblue', marginBottom: '3em' }} className="mt-4 mb-8 px-8 py-3 !bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:!bg-blue-600 transition-colors duration-300">
              View Event Calendar
            </button>
          </Link>
        </section>

        {/* Images with overlay text section */}
        <section className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="relative w-1/3 md:w-1/4">
            <img
              src="/images/library.png"
              alt="Library"
              className="object-cover custom-image"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p style={{ color: 'white', fontSize: '2rem' }} className="text-lg">Reservable Buildings</p>
            </div>
          </div>
          <div className="relative w-1/3 md:w-1/4">
            <img
              src="/images/stadium.png" 
              alt="Stadium"
              className="object-cover custom-image"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p style={{ color: 'white', fontSize: '2rem' }} className="text-lg">Book an Event</p>
            </div>
          </div>
          <div className="relative w-1/3 md:w-1/4">
            <img
              src="/images/building.png"
              alt="Event Space"
              className="object-cover custom-image"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p style={{ color: 'white', fontSize: '2rem' }} className="text-lg">Event Space</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
