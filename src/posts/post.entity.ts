import { Community } from '../communities/community.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:'', type: "text"})
  content: string;

  @CreateDateColumn({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)"})
  postedAt: Date;

  @UpdateDateColumn()
  editedAt: Date;

  @Column({default: 0})
  likes: number;

  @Column()
  communityId:number;

  @Column()
  userId:number;

  @ManyToOne(()=>Community, (communtiy)=>{communtiy.posts},{
    cascade:true
  })
  community: Community;

  @ManyToOne(()=>User, (user)=>{user.posts})
  user: User;

}
