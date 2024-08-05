import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubComment } from './sub-comment.entity';

@Injectable()
export class SubCommentService {
    constructor(
        @InjectRepository(SubComment)
        private subCommentRepository: Repository<SubComment>
    ){}

    async findAll(): Promise<SubComment[]>{
        return await this.subCommentRepository.find();
    }

    async findByID(id): Promise<SubComment | null>{
        return await this.subCommentRepository.findOneBy({id});
    }

    async findByComment(comment): Promise<SubComment[]>{
        return await this.subCommentRepository
                        .find({
                            where:{
                               comment:comment 
                            }
                        });
    }

    async createSubComment(body): Promise<SubComment | null>{
        return await this.subCommentRepository.save(body);
    }

    async updateSubComment(id,data): Promise<any>{
        return await this.subCommentRepository.update(id,data);
    }

    async deleteSubComment(id): Promise<void>{
        await this.subCommentRepository.delete(id);
    }
}
