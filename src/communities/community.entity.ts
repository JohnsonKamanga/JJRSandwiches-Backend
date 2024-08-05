import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'

@Entity()
export class Community {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    name: string;

    @Column({default: ''})
    description: string;

    @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @Column({default: ''})
    communityPicture: string;

    @ManyToMany(()=> User, (user)=> user.communities, {
        cascade: true,
    })
    @JoinTable()
    members: User[];

    @OneToMany(()=>Post, (post)=>{post.community})
    posts: Post[];
}
