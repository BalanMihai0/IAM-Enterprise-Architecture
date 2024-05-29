/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from "react";
import Sidebar from "../components/offer/Sidebar";
import OfferCard from '../components/offer/OfferCard'
import axios from 'axios'
import { IoLocationSharp } from "react-icons/io5";
import { Typography } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify"

const OffersPage = () => {
    const [selectedDateRange, setSelectedDateRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [items, setItems] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleDateRangeChange = (newDateRange) => {
        setSelectedDateRange(newDateRange);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/v1/jobs');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="flex flex-col md:flex-row md:h-[calc(100vh-5rem)]">
            <ToastContainer />
            <div className="flex w-full md:w-[340px]">
                <Sidebar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={handleDateRangeChange}
                    onSearch={handleSearch}
                />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {
                        items.length > 0 ? (
                            items.map(item => (
                                <OfferCard key={item.id} item={item} />
                            ))
                        ) : (
                            <Typography className="p-10 text-lg">
                                Sorry, no offers found.
                            </Typography>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default OffersPage;
