/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Card, CardHeader, Typography, CardBody } from "@material-tailwind/react";
import Booking from "../../types/Booking";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const BookingCard = ({ booking }: { booking: Booking }) => {
    const [job, setJob] = useState<Job>();
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchJobFromBooking = async () => {
            try {
                const headers = accessToken ? {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  } : {};

                const response = await axios.get(`/api/v1/bookings/${booking.id}`, headers);
                setJob(response.data.job);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };

        fetchJobFromBooking();
    }, [booking.jobId]);

    return (
        <Card key={booking.id} className="shadow-lg">
            <CardHeader color="gray" className="relative h-20">
                <Typography variant="h5" className="text-white absolute bottom-4 left-4">
                    {job?.title}
                </Typography>
            </CardHeader>
            <CardBody>
                <Typography>
                    Start Date: {new Date(booking.startDate).toLocaleDateString()}
                </Typography>
                <Typography>
                    End Date: {new Date(booking.endDate).toLocaleDateString()}
                </Typography>
            </CardBody>
        </Card>
    );
}

export default BookingCard;