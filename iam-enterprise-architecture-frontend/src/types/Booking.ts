import { User } from './User';
import { Job } from './Job';

export type Booking = {
    id: number;
    startDate: string;
    endDate: string;
    creationDate: string;
    requester: User;
    job: Job;
}