import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Job } from "./job";

@Entity({name:'bookings'})
export class Booking{
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(()=>User)
    requester:User;
    @OneToOne(()=>Job)
    job:Job;
}