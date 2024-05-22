/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useState } from 'react';
import { Card, Input, Radio, Typography, Button } from '@material-tailwind/react';

const Sidebar = ({ selectedDateRange, onDateRangeChange, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchClick = () => {
        onSearch(searchQuery);
    };

    return (
        <Card className="h-[calc(100vh-5rem)] w-full max-w-[20rem] m-1 p-4 shadow-lg shadow-blue-gray-900/5">
            <div className="mb-4 p-4">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    Search
                </Typography>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearchClick} className="mt-2 w-full" size='sm'>
                    Apply
                </Button>
                <Typography variant="h6" color="blue-gray" className="mb-2 mt-4">
                    Filter by Date
                </Typography>
                <div className="flex flex-col">
                    <Radio
                        id="last-7-days"
                        name="date-range"
                        label="Last 7 days"
                        onChange={() => onDateRangeChange('last-7-days')}
                        checked={selectedDateRange === 'last-7-days'}
                    />
                    <Radio
                        id="last-month"
                        name="date-range"
                        label="Last Month"
                        onChange={() => onDateRangeChange('last-month')}
                        checked={selectedDateRange === 'last-month'}
                    />
                    <Radio
                        id="last-year"
                        name="date-range"
                        label="Last Year"
                        onChange={() => onDateRangeChange('last-year')}
                        checked={selectedDateRange === 'last-year'}
                    />
                    <Radio
                        id="all"
                        name="date-range"
                        label="All"
                        onChange={() => onDateRangeChange('all')}
                        checked={selectedDateRange === 'all'}
                    />
                </div>
            </div>
        </Card>
    );
}

export default Sidebar;