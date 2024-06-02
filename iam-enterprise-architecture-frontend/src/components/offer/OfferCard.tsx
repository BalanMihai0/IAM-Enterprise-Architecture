/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Card, CardHeader, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';
import { IoLocationSharp } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useState } from 'react';
import OfferDetailsModal from './OfferDetailsModal';

const OfferCard = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <Card className="shadow-md m-2 flex flex-col justify-between p-0">
                <CardBody>
                    <div className="mb-2 flex flex-col justify-between">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {item.title}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium flex items-center gap-1">
                            <IoLocationSharp />
                            {item.location}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium flex items-center gap-1">
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
                        size='sm'
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        More details
                    </Button>
                </CardFooter>
            </Card>
            <OfferDetailsModal isOpen={isModalOpen} onClose={handleModalToggle} offer={item} />
        </>
    );
};

export default OfferCard;
