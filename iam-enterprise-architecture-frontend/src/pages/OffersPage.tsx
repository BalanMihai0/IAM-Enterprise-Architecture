/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import OfferCard from '../components/OfferCard'

const OffersPage = () => {
    const [selectedDateRange, setSelectedDateRange] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [items, setItems] = useState([]);

    const handleDateRangeChange = (newDateRange) => {
        setSelectedDateRange(newDateRange);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        console.log('Selected Date Range:', selectedDateRange);
    }, [selectedDateRange]);

    useEffect(() => {
        if (searchQuery !== "") {
            console.log('Search Query:', searchQuery);
        }
    }, [searchQuery]);

    return (
        <div className="flex">
            <Sidebar
                selectedDateRange={selectedDateRange}
                onDateRangeChange={handleDateRangeChange}
                onSearch={handleSearch}
            />
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map(item => (
                        <OfferCard key={item.id} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OffersPage;
