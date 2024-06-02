import { User } from "./user";
import { Job } from "./job";
export declare class Booking {
    id: number;
    requester: User;
    job: Job;
    startDate: Date;
    endDate: Date;
    creationDate: Date;
}
