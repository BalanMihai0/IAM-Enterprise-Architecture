/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { getTokenUniqueName } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/booking/BookingCard';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(getTokenUniqueName());
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const headers = accessToken ? {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        } : {};

        if (!userId) return console.error('No user ID found');

        const response = await axios.get(`/api/v1/bookings/user/${userId}`, headers);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="text-center mb-8">
        Your Bookings
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;