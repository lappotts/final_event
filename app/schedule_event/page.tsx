// schedule_event/page.tsx
"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ScheduleEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    details: '',
    buildingName: '',
    roomNumber: '',
  });

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2); // Two days ahead

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate room number to only accept positive integers
    if (name === 'roomNumber' && value !== '') {
      const isValid = /^\d+$/.test(value);
      if (!isValid) return; // Ignore invalid input
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event Scheduled:', formData);
    // Add form submission logic here
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Schedule an Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eventName" className="block text-lg font-medium">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min={formatDate(minDate)} // Restrict minimum date
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-lg font-medium">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="buildingName" className="block text-lg font-medium">Building Name</label>
            <select
              id="buildingName"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a Building</option>
              <option value="The Pavilion">The Pavilion</option>
              <option value="Weir Hall">Weir Hall</option>
              <option value="Conner Hall">Conner Hall</option>
              <option value="Lamar Hall">Lamar Hall</option>
            </select>
          </div>
          <div>
            <label htmlFor="roomNumber" className="block text-lg font-medium">Room Number</label>
            <input
              type="number"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="1" // Positive whole numbers only
              step="1" // Prevent decimals
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-lg font-medium">Event Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
