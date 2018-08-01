import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './category';
import {Author} from './author';

@Entity('post')
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    text: string;

    @ManyToMany(type => Category, {
        cascade: ['insert']
    })
    @JoinTable()
    categories: Category[];

    @ManyToOne(type => Author, author => author.posts, {
        cascade: ['insert']
    })
    author: Author;
}
