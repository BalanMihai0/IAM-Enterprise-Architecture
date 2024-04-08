import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Job } from "./job";

@Entity({name:'bookings'})
export class Booking{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    requester:User;
    @Column()
    job:Job;
}