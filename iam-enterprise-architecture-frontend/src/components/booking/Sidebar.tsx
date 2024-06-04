import { useState } from 'react';
import { Card, Input, Radio, Typography, Button } from '@material-tailwind/react';

interface SidebarProps {
    selectedFilter: string;
    onSelectedFilterChange: (filter: string) => void;
    onSearch: (searchQuery: string) => void;
}

const Sidebar = (props: SidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedFilter, onSelectedFilterChange, onSearch } = props;

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
                        id="ongoing"
                        name="ongoing"
                        label="Ongoing"
                        onChange={() => onSelectedFilterChange('ongoing')}
                        checked={selectedFilter === 'ongoing'}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="past"
                        name="past"
                        label="Past"
                        onChange={() => onSelectedFilterChange('past')}
                        checked={selectedFilter === 'past'}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="upcoming"
                        name="upcoming"
                        label="Upcoming"
                        onChange={() => onSelectedFilterChange('upcoming')}
                        checked={selectedFilter === 'upcoming'}
                        crossOrigin={undefined}
                    />
                    <Radio
                        id="all"
                        name="date-range"
                        label="All"
                        onChange={() => onSelectedFilterChange('all')}
                        checked={selectedFilter === 'all'}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
        </Card>
    );
}

export default Sidebar;
