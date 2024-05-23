/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import OfferCard from '../components/OfferCard'
import axios from 'axios'
import { IoLocationSharp } from "react-icons/io5";

const OffersPage = () => {
    const [selectedDateRange, setSelectedDateRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [items, setItems] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
        <div className="flex flex-col lg:flex-row">
            <div className="w-[340px] hidden lg:flex">
                <Sidebar
                    selectedDateRange={selectedDateRange}
                    onDateRangeChange={handleDateRangeChange}
                    onSearch={handleSearch}
                />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map(item => (
                        <OfferCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OffersPage;
