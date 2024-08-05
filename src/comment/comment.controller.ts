import { Body, Controller, Get, Param, Post, Query, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
    constructor(private commentServices: CommentService,
    ){}

    @Get()
    async findComments(){
        return await this.commentServices.findAll();
    }

    @Get(':id')
    async findComment(@Param('id')id){
        return await this.commentServices.findOneByID(id);
    }
    
    @Get('post/:id')
    async findPostComments(@Param('id')id){
        return await this.commentServices.findByPost({id});
    }

    @Get('subcomments/:id')
    async findSubComments(@Param('id')id){
        return await this.commentServices.findSubComments(id);
    }

    @Post()
    async createComment(
        @Body('id')id,
        @Body('content')content:string,
        @Body('post')post,
        @Body('user')user
    ){
        return await this.commentServices.createComment({id, content, post, user});
    }

    @Put(':id')
    async updateComment(
        @Param('id')id,
        @Body('content')content
    ){
        return await this.commentServices.updateComment(id,{content})
    }

    @Delete(':id')
    async deleteComment(@Param('id')id){
        return await this.commentServices.removeComment(id);
    }
}
