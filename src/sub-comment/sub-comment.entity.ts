import { Comment } from '../comment/comment.entity';
import { User } from '../users/user.entity';
import {
    Entity,
    Column,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';

@Entity()
export class SubComment {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:'', type: "text"})
    content:string;

    @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
    commentedAt: Date;

    @UpdateDateColumn()
    editedAt: Date;

    @Column()
    commentId:number;

    @ManyToOne(()=>Comment)
    comment: Comment;

    @ManyToOne(()=>User, (user)=>user.subcomments)
    user: User;
}
