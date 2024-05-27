import React from "react";
import { Typography, Button, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md text-center" placeholder={"card"}>
        <Typography variant="h4" color="blue-gray" className="mb-4" placeholder={"title"}>
          Whoops! Page not found!
        </Typography>
        <Typography color="blue-gray" className="mb-6" placeholder={"description"}>
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </Typography>
        <Button className="mt-4" variant="gradient" onClick={handleGoBack} placeholder={"button"}>
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;
