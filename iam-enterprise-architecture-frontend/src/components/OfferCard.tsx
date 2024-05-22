/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Card, Typography } from '@material-tailwind/react';

const OfferCard = ({ title, description }) => (
    <Card className="p-4 shadow-md m-2 h-[300px]">
        <Typography variant="h6" color="blue-gray">
            {title}
        </Typography>
        <Typography variant="body2" color="gray">
            {description}
        </Typography>
    </Card>
);

export default OfferCard;