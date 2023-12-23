import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    definition: string;

    @Column()
    language: string;
}
