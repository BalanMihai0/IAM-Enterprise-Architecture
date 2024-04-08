import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    location: string;
    @Column()
    price: number;
    @Column()
    start_date: Date;
    @Column()
    end_date: Date;
    @Column()
    posted_by: number;
    @Column()
    posted_on: Date;
}