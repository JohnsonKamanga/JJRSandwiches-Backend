import { Comment } from "../comment/comment.entity";
import { Community } from "../communities/community.entity";
import { Post } from "../posts/post.entity";
import { Recipe } from "../recipe/recipe.entity";
import { SubComment } from "../sub-comment/sub-comment.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default : ''})
    username: string;

    @Column({default : ''})
    userEmail: string;

    @Column({default : ''})
    firstName: string;

    @Column({default : ''})
    lastName: string;

    @Column({default : ''})
    password: string;

    @Column({default : ''})
    location: string;

    @Column({default : ''})
    bio: string;

    @Column({default : '9999-01-01'})
    dob: string;

    @Column({default : ''})
    profilePicture: string;

    @Column({default : false})
    isActive: boolean;

    @OneToMany((type)=> Recipe, (recipe)=> recipe.user)
    recipes: Recipe[];

    @ManyToMany(()=>Community, (community)=> community.members)
    communities: Community[];

    @OneToMany(()=> Post, (post)=>{post.user})
    posts: Post[];

    @OneToMany(()=>Comment, (comment)=>{comment.user})
    comments: Comment[];

    @OneToMany(()=>SubComment, (subComment)=>{subComment.user})
    subcomments: SubComment[];
}