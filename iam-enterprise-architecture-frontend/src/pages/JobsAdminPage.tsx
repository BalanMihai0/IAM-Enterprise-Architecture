/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useReducer, ChangeEvent, useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,
  Input,
  Textarea,
} from "@material-tailwind/react";
import "../style/landingPage.css";
import { FormEvent } from "react";
import useAxiosInterceptors from "../api/AxiosConfig";

interface JobState {
  title: string;
  description: string;
  location: string;
  price: number;
  type: string;
}

const initialState: JobState = {
  title: "",
  description: "",
  location: "",
  price: 0,
  type: "",
};

type Action = { type: "UPDATE_FIELD"; field: string; value: string | number };

const reducer = (state: JobState, action: Action): JobState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const JobsAdminPage = () => {
  const [job, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState<string>("");
  const axiosInstance = useAxiosInterceptors();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !job.title ||
      !job.description ||
      !job.location ||
      job.price <= 0 ||
      !job.type
    ) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/v1/jobs", job, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response && response.status === 201) {
        setMessage("Job created successfully!");
        dispatch({ type: "UPDATE_FIELD", field: "title", value: "" });
        dispatch({ type: "UPDATE_FIELD", field: "description", value: "" });
        dispatch({ type: "UPDATE_FIELD", field: "location", value: "" });
        dispatch({ type: "UPDATE_FIELD", field: "price", value: 0 });
        dispatch({ type: "UPDATE_FIELD", field: "type", value: "" });
      } else {
        setMessage("Failed to create the job.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An internal error occurred.");
    }
  };

  return (
    <div className="m-5 flex justify-center">
      <div className="w-1/2">
        <Card placeholder="Card Placeholder">
          <CardBody placeholder="">
            <Typography variant="h2" className="text-2xl font-bold mb-6">
              Submit a new job
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="description">Description</label>
                <Textarea
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="location">Location</label>
                <Input
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="price">Price</label>
                <Input
                  type="number"
                  name="price"
                  value={job.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="type">Type</label>
                <Input
                  type="text"
                  name="type"
                  value={job.type}
                  onChange={handleChange}
                  placeholder="Type"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                color="blue"
                className="mt-4"
              >
                Create Job
              </Button>
            </form>
            {message === "Job created successfully!" ? (
              <p className="mt-4 text-green-500">{message}</p>
            ) : (
              <p className="mt-4 text-red-600">{message}</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default JobsAdminPage;
