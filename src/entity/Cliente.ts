import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 14})
    cpf: string;

    @Column()
    numCompras: number;

    @Column()
    userId: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User; // navigation property
}