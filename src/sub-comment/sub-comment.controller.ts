import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubCommentService } from './sub-comment.service';

@Controller('subcomments')
export class SubCommentController {
    constructor(private subCommentServices : SubCommentService){}

    @Get()
    async findAllSubComments(){
        return await this.subCommentServices.findAll();
    }

    @Get(':id')
    async findCommentSubComments(@Param('id')id){
        return await this.subCommentServices.findByID(id);
    }

    @Post()
    async createSubComment(
        @Body('comment')comment,
        @Body('id')id,
        @Body('content')content,
        @Body('user')user,
    ){
        return await this.subCommentServices.createSubComment({id, content, comment, user})
    }

    @Put(':id')
    async updateSubComment(@Param('id')id, @Body('content')content){
        return await this.subCommentServices.updateSubComment(id,{content});
    }

    @Delete(':id')
    async deleteSubComment(@Param('id')id){
        return await this.subCommentServices.deleteSubComment(id);
    }
}
