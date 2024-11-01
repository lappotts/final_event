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
          <Link href="/calendar">
            <button style = {{backgroundColor: 'lightblue', marginBottom: '3em' }} className="mt-4 mb-8 px-8 py-3 !bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:!bg-blue-600 transition-colors duration-300">
              View Event Calendar
            </button>
          </Link>
        </section>

        {/* Images with overlay text section */}

<section
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginTop: '2rem',
  }}
>
  <Link href="/buildings-and-floorplans">
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <img
        src="/images/library.png"
        alt="Buildings and floorplans"
        style={{ width: '100%', objectFit: 'cover', height: '200px' }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
      }}>
        <p style={{ fontSize: '1.5rem' }}>Buildings and floorplans</p>
      </div>
    </div>
  </Link>

  <Link href="/book-an-event">
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <img
        src="/images/stadium.png"
        alt="Book an Event"
        style={{ width: '100%', objectFit: 'cover', height: '200px' }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
      }}>
        <p style={{ fontSize: '1.5rem' }}>Book an Event</p>
      </div>
    </div>
  </Link>

  <Link href="/available-spaces">
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <img
        src="/images/grove.png"
        alt="Available Spaces"
        style={{ width: '100%', objectFit: 'cover', height: '200px' }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
      }}>
        <p style={{ fontSize: '1.5rem' }}>Available Spaces</p>
      </div>
    </div>
  </Link>
</section>


      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
