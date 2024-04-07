import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    full_name: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column()
    role: string;
}