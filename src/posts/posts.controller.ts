import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService){}

    @Get()
    async findPosts(){
        return await this.postsServices.findAll();
    }

    @Get('community/search')
    async findByQuery(@Query('id')id?,@Query('query')query?: string){
        return await this.postsServices.findByQuery(id,query);
    }

    @Get(':id')
    async findPost(@Param('id')id){
        return await this.postsServices.findOneByID(id);
    }

    @Get('community/:id')
    async findCommunityPosts(@Param('id')id){
        return await this.postsServices.findByCommunity({id});
    }

    @Get('user/:id')
    async findUserPosts(@Param('id')id){
        return await this.postsServices.findByUser({id});
    }

    @Post()
    async createPost(
        @Body('user')user,
        @Body('community')community,
        @Body('content')content,
        @Body('id')id,
        ){
        return await this.postsServices.createPost({user, community, content, id})
    }

    @Put(':id')
    async updatePost(
        @Param('id')id,
        @Body('content')content,
        @Body('likes')likes:number,
    ){
        return await this.postsServices.updatePost(id,{content,likes});
    }

    @Delete(':id')
    async deletePost(@Param('id')id){
        return await this.postsServices.removePost(id);
    }

}
