import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ){}

    async findAll(): Promise<Post[]>{
        return await this.postsRepository.find();
    }

    async findOneByID(id): Promise<Post | null>{
        return await this.postsRepository.findOne({
            where:{
                id: id,
            },
            relations:{
                user:true,
                community:true
            }
        })
    }

    async findByQuery(id,query): Promise<Post[]>{
        return await this.postsRepository.find({
            where:{   
                    communityId:id,
                    content: ILike(`%${query}%`)
                },
            relations:{
                user:true
            }
        })
    }

    async findByCommunity(community): Promise<Post[] | null>{
        return await this.postsRepository.find({
            where:{
                community: community,
            },
            relations:{
                user:true
            }
        })
    }

    async findByUser(user): Promise<Post[]>{
        return await this.postsRepository.find({
            where:{
                user: user
            },
            relations:{
                user:true,
                community:true
            }
        })
    } 

    async createPost(body): Promise<Post | null>{
        return await this.postsRepository.save(body);
    }

    async updatePost(id, data): Promise<any>{
        return await this.postsRepository.update(id, data);
    }

    async removePost(id): Promise<void>{
        await this.postsRepository.delete(id);
    }

}
