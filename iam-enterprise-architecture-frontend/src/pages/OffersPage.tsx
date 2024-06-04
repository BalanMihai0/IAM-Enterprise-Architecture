/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import Sidebar from "../components/offer/Sidebar";
import OfferCard from "../components/offer/OfferCard";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";

const OffersPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const limit = 15;

  const handleDateRangeChange = (newDateRange) => {
    setPage(1);
    setSelectedDateRange(newDateRange);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchJobs(1, limit, selectedDateRange, query);
  };

  const fetchJobs = async (page, limit, dateRange, query) => {
    setIsLoading(true);
    try {
      const url = "/api/v1/jobs";
      const params = { page, limit };
      if (dateRange && dateRange !== "all") {
        if (dateRange === "last-7-days") {
          params.startDate = new Date(
            new Date().setDate(new Date().getDate() - 7)
          )
            .toISOString()
            .split("T")[0];
        } else if (dateRange === "last-month") {
          params.startDate = new Date(
            new Date().setMonth(new Date().getMonth() - 1)
          )
            .toISOString()
            .split("T")[0];
        } else if (dateRange === "last-year") {
          params.startDate = new Date(
            new Date().setFullYear(new Date().getFullYear() - 1)
          )
            .toISOString()
            .split("T")[0];
        }
      }
      if (query) {
        params.title = query;
      }

      const response = await axios.get(url, { params });
      setItems(response.data.items);
      setTotalItems(response.data.meta.totalItems);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchJobs(page, limit, selectedDateRange, searchQuery);
    }
    fetchData();
  }, [page, limit, selectedDateRange, searchQuery]);

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  const totalPages = Math.ceil(totalItems / limit);

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
        {isLoading ? (
          <Typography className="p-10 text-lg">Loading...</Typography>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.length > 0 ? (
                items.map((item) => <OfferCard key={item.id} item={item} />)
              ) : (
                <Typography className="p-10 text-lg">
                  Sorry, no offers found.
                </Typography>
              )}
            </div>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={page - 1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
