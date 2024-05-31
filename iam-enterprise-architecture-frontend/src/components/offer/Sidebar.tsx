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
        <Card className="md:h-[calc(100vh-5rem)] w-full md:max-w-[20rem] m-2 mx-4 md:m-1 md:mx-0 p-2 md:p-4 shadow-lg shadow-blue-gray-900/5" placeholder={undefined}>
            <div className="mb-4 p-4">
                <Typography variant="h6" color="blue-gray" className="mb-1" placeholder={"Enter title"}>
                    Search
                </Typography>
                <Input
                    type="text"
                    size='md'
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    crossOrigin={undefined}
                />
                <Button onClick={handleSearchClick} className="mt-2 w-full" size='sm' placeholder={undefined}>
                    Apply
                </Button>
                <Typography variant="h6" color="blue-gray" className="mb-2 mt-4" placeholder={undefined}>
                    Filter by Creation Date
                </Typography>
                <div className="flex flex-col">
                    <Radio
                        id="last-7-days"
                        name="date-range"
                        label="Last 7 days"
                        onChange={() => onDateRangeChange('last-7-days')}
                        checked={selectedDateRange === 'last-7-days'}
                        placeholder={undefined}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="last-month"
                        name="date-range"
                        label="Last Month"
                        onChange={() => onDateRangeChange('last-month')}
                        checked={selectedDateRange === 'last-month'}
                        placeholder={undefined}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="last-year"
                        name="date-range"
                        label="Last Year"
                        onChange={() => onDateRangeChange('last-year')}
                        checked={selectedDateRange === 'last-year'}
                        placeholder={undefined}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="all"
                        name="date-range"
                        label="All"
                        onChange={() => onDateRangeChange('all')}
                        checked={selectedDateRange === 'all'}
                        placeholder={undefined}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
        </Card>
    );
}

export default Sidebar;
