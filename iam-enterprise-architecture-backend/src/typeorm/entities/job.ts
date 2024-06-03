import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;
    @Column()
    title: string;
    @Column({ length: 1000 })
    description: string;
    @Column()
    location: string;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
    @Column()
    posted_by: string;
    @Column()
    posted_on: Date;
}