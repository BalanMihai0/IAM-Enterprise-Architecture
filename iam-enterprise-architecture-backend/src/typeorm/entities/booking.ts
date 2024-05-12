import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinColumn } from "typeorm";
import { User } from "./user";
import { Job } from "./job";

@Entity({name:'bookings'})
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    requester: User;

    @ManyToOne(() => Job)
    job: Job;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
    
    @Column()
    creationDate: Date;
}