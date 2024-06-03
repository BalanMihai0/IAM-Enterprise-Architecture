import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import BookingCard from "../components/booking/BookingCard";
import Sidebar from "../components/booking/Sidebar";
import useAxiosInterceptors from "../api/AxiosConfig";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const BookingsPage = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { accessToken } = useAuth();
  const axiosInstance = useAxiosInterceptors();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        //@ts-expect-error - unique_name is a property of the decoded token
        const userId = jwtDecode(accessToken as string)?.unique_name;
        const response = await axiosInstance.get(
          `/api/v1/bookings/user/${userId}`
        );
        setAllBookings(response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [accessToken, axiosInstance]);

  useEffect(() => {
    if (selectedFilter === "all") {
      setBookings(allBookings);
    } else if (selectedFilter === "ongoing") {
      setBookings(
        allBookings.filter(
          (booking) =>
            //@ts-expect-error - startDate is a property of booking
            new Date(booking.startDate) <= new Date() &&
            //@ts-expect-error - endDate is a property of booking
            new Date(booking.endDate) >= new Date()
        )
      );
    } else if (selectedFilter === "past") {
      setBookings(
        //@ts-expect-error - endDate is a property of booking
        allBookings.filter((booking) => new Date(booking.endDate) < new Date())
      );
    } else if (selectedFilter === "upcoming") {
      setBookings(
        allBookings.filter(
          //@ts-expect-error - startDate is a property of booking
          (booking) => new Date(booking.startDate) > new Date()
        )
      );
    }

    if (searchQuery) {
      setBookings(
        bookings.filter((booking) =>
          //@ts-expect-error - job is a property of booking
          booking.job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [selectedFilter, searchQuery, allBookings, bookings]);

  const handleSelectedFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-5rem)]">
      <div className="flex w-full md:w-[340px]">
        <Sidebar
          selectedFilter={selectedFilter}
          onSelectedFilterChange={handleSelectedFilterChange}
          onSearch={handleSearch}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <Typography
          variant="h2"
          className="text-center mb-8"
          placeholder={"typography"}
        >
          Your Bookings
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {bookings.map((booking: { id: string }) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
