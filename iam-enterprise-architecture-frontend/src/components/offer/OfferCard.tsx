/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useState } from "react";
import OfferDetailsModal from "./OfferDetailsModal";
import Other from "../../assets/jobs_pictures/Other.jpg";
import AntiTerrorism from "../../assets/jobs_pictures/AntiTerrorism.jpg";
import Cybersecurity from "../../assets/jobs_pictures/Cybersecurity.jpg";
import Divorce from "../../assets/jobs_pictures/Divorce.jpg";
import Bodyguard from "../../assets/jobs_pictures/Bodyguard.jpg";
import Warfare from "../../assets/jobs_pictures/Warfare.jpg";
import HostageRescue from "../../assets/jobs_pictures/HostageRescue.jpg";

const OfferCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(item.type);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  let imageSource;
  switch (item.type) {
    case "HostageRescue":
      imageSource = HostageRescue;
      break;
    case "Warfare":
      imageSource = Warfare;
      break;
    case "Bodyguard":
      imageSource = Bodyguard;
      break;
    case "Divorce":
      imageSource = Divorce;
      break;
    case "AntiTerrorism":
      imageSource = AntiTerrorism;
      break;
    case "Cybersecurity":
      imageSource = Cybersecurity;
      break;
    case "Other":
      imageSource = Other;
      break;
    default:
      imageSource = Other; // Default image
  }

  return (
    <>
      <Card className="shadow-md m-2 flex flex-col justify-between p-0">
        <CardHeader color="blue-gray" className="relative h-56" floated={false}>
          <img
            src={imageSource}
            alt="card-image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex flex-col justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.title}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium flex items-center gap-1"
            >
              <IoLocationSharp />
              {item.location}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-medium flex items-center gap-1"
            >
              <FaEuroSign />
              {item.price}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={handleModalToggle}
            ripple={false}
            fullWidth={true}
            size="sm"
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            More details
          </Button>
        </CardFooter>
      </Card>
      <OfferDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        offer={item}
      />
    </>
  );
};

export default OfferCard;
