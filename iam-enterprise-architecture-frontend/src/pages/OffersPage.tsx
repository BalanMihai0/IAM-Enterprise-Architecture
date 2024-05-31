/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import Sidebar from "../components/offer/Sidebar";
import OfferCard from '../components/offer/OfferCard';
import axios from 'axios';
import { Typography } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

const OffersPage = () => {
    const [selectedDateRange, setSelectedDateRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleDateRangeChange = (newDateRange) => {
        setSelectedDateRange(newDateRange);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchJobs(newDateRange, query);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const fetchJobs = async (dateRange, query) => {
        setIsLoading(true);
        try {
            let url = '/api/v1/jobs';
            const params = {};
            if (dateRange && dateRange !== 'all') {
                if (dateRange === 'last-7-days') {
                    params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
                } else if (dateRange === 'last-month') {
                    params.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];
                } else if (dateRange === 'last-year') {
                    params.startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
                }
            }
            if (query) {
                params.title = query;
            }
            const response = await axios.get(url, { params });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchJobs(selectedDateRange, searchQuery);
    }, [selectedDateRange]);

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
                {
                    isLoading ? (
                        <Typography className="p-10 text-lg">
                            Loading...
                        </Typography>
                    ) : (
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
                    )
                }
            </div>
        </div>
    );
}

export default OffersPage;
