/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from 'react';
import { Typography, Card, CardBody } from '@material-tailwind/react';
import { IoLocationSharp } from 'react-icons/io5';
import { FaEuroSign } from 'react-icons/fa';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const OfferDetailsModal = ({ isOpen, onClose, offer }) => {
    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const { accessToken, setAccessToken } = useAuth();

    if (!isOpen) return null;

    const handleConfirm = () => {
        if ((startDate >= new Date()) && endDate&& startDate && (startDate < endDate)){
            setStep(2);
        }
        else{toast.error("Please enter a valid start and end date!")}
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleFinish = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);

        const payload = {
            job: offer.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };

        try {
            const headers = accessToken ? {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            } : {};

            await axios.post('/api/v1/bookings', payload, headers);
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error(CustomToastNotLoggedIn);
            } else {
                console.error('Error booking offer:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const CustomToastNotLoggedIn = () => (
        <div>
            You must log in to make a booking. <Link to="/login" style={{ color: 'black', textDecoration: 'underline' }}>Login</Link>
        </div>
    );

    const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
    const totalPrice = numberOfDays * offer.price;

    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                <div className="w-full h-full max-w-[calc(100%)] max-h-[calc(100%)] md:max-w-[calc(100%-5rem)] md:max-h-[calc(100%-5rem)] p-4 md:m-4 bg-white md:rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-2 border-b">
                        <Typography variant='h5' className="text-xl font-semibold">
                            {step === 1 ? offer.title : 'Booking Summary'}
                        </Typography>
                        <button
                            onClick={onClose}
                            className="text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col p-4 overflow-auto h-[calc(100%-7.5rem)]">
                        {step === 1 ? (
                            <div className='h-full flex flex-col'>
                                <div className="flex flex-row gap-52">
                                    <div>
                                        <Typography variant='h5' className="font-medium flex items-center gap-1">
                                            <IoLocationSharp />
                                            {offer.location}
                                        </Typography>
                                        <Typography variant='h5' className="font-medium flex items-center gap-1">
                                            <FaEuroSign />
                                            {offer.price} / Day
                                        </Typography>
                                    </div>
                                    <div className='flex gap-5'>
                                        <Typography variant='h5' className="font-medium flex items-center gap-1">
                                            Type:
                                        </Typography>
                                        <Typography variant='h5' className="font-medium flex items-center gap-1">
                                            {offer.type ? offer.type : 'Not specified'}
                                        </Typography>

                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <Typography className='max-w-[300px] md:max-w-[500px]'>{offer.description}</Typography>
                                </div>
                                <div className='flex flex-row gap-4 mt-20'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(newValue) => {
                                                setStartDate(newValue);
                                                if (endDate && newValue >= endDate) {
                                                    setEndDate(null);
                                                }
                                            }}
                                            minDate={new Date()}
                                            renderInput={(params) => <input {...params} />}
                                        />
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)}
                                            minDate={startDate ? addDays(startDate, 1) : null}
                                            disabled={!startDate}
                                            renderInput={(params) => <input {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Card className="mb-4">
                                    <CardBody>
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h6" className="font-semibold">Title:</Typography>
                                            <Typography>{offer.title}</Typography>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <Typography variant="h6" className="font-semibold">Location:</Typography>
                                            <Typography className="flex items-center gap-1">
                                                <IoLocationSharp />
                                                {offer.location}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <Typography variant="h6" className="font-semibold">Price per day:</Typography>
                                            <Typography className="flex items-center gap-1">
                                                <FaEuroSign />
                                                {offer.price}
                                            </Typography>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <Typography variant="h6" className="font-semibold">Start Date:</Typography>
                                            <Typography>{startDate?.toLocaleDateString()}</Typography>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <Typography variant="h6" className="font-semibold">End Date:</Typography>
                                            <Typography>{endDate?.toLocaleDateString()}</Typography>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="">
                                    <CardBody>
                                        <div className="flex items-center justify-between mb-2">
                                            <Typography variant="h6" className="font-semibold">Total Days:</Typography>
                                            <Typography variant="h5" className="font-bold">{numberOfDays}</Typography>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h6" className="font-semibold">Total Price:</Typography>
                                            <Typography variant="h5" className="font-bold">{totalPrice} €</Typography>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-5 items-center justify-center border-t p-2">
                        {step === 1 ? (
                            <div className='flex flex-row justify-center gap-2 w-full'>
                                <div className='flex w-full md:w-48'>
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 w-full font-bold text-white bg-red-500 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className='flex w-full md:w-48'>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-2 w-full font-bold text-white bg-green-500 rounded-lg"
                                        disabled={!startDate || !endDate}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-row justify-center gap-2 w-full'>
                                <div className='flex w-full md:w-48'>
                                    <button
                                        onClick={handleBack}
                                        className="px-4 py-2 w-full font-bold text-white bg-gray-500 rounded-lg"
                                    >
                                        Back
                                    </button>
                                </div>
                                <div className='flex w-full md:w-48'>
                                    <button
                                        onClick={handleFinish}
                                        className="px-4 py-2 w-full font-bold text-white bg-green-500 rounded-lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Finishing...' : 'Finish'}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="bottom-0 left-0 w-full h-3 bg-gray-300">
                            <div
                                className={`h-full ${step === 1 ? 'w-1/2' : 'w-full'} bg-blue-500 transition-width duration-300`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferDetailsModal;
