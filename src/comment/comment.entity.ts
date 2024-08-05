import { Post } from '../posts/post.entity';
import { SubComment } from '../sub-comment/sub-comment.entity';
import { User } from '../users/user.entity';
import {
    Entity,
    Column,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:'', type: "text"})
    content:string;

    @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
    commentedAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @ManyToOne(()=>Post,{
      cascade:true
    })
    post: Post;

    @ManyToOne(()=>User, (user)=>{user.comments})
    user: User;

}
