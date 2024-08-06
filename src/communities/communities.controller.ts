import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'node:path/posix';
import { diskStorage, memoryStorage } from 'multer';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { Response } from 'express';
import { uploadFile } from 'src/cloudinaryConfig';

@Controller('communities')
export class CommunitiesController {
  constructor(private communitiesService: CommunitiesService) {}

  @Get('all')
  async findCommunties() {
    return this.communitiesService.findAll();
  }

  @Get('search')
  async findByQuery(@Query('query')query?:string){
    return await this.communitiesService.findByQuery(query);
  }

  @Get(':id')
  async findCommunityByID(@Param('id') id) {
    return await this.communitiesService.findByID(id);
  }

  @Get()
  async findCommunityByName(@Body('name') name: string) {
    return await this.communitiesService.findByName(name);
  }


  @Get('members/:id')
  async findCommunityMembers(@Param('id') id) {
    return await this.communitiesService.findUsers(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('communityPicture',{
    storage:memoryStorage()
}))

  async createCommunity(
    @UploadedFile()file: Express.Multer.File, @Req() request: Request
  ){
    let uploadResult;
        if(file){
            uploadResult = await uploadFile(file.buffer,"uploads/community-pictures" );
        
        ;}
    return await this.communitiesService.create({...request.body, communityPicture: uploadResult?.secure_url});
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image',{
   storage:memoryStorage(),
  }))
  async update(@UploadedFile()file: Express.Multer.File, @Param('id')id, @Req() request: Request){
    let uploadResult;
    if(file){
      uploadResult = await uploadFile(file.buffer,'uploads/community-pictures' );
    }

    return await this.communitiesService.update(id, {...request.body, image: uploadResult?.secure_url})
  }
  @Delete(':id')
  async deleteCommunity(@Param('id') id) {
    return await this.communitiesService.remove(id);
  }

  @Get('members/user/:id')
  async findUserCommunities(@Param('id') id) {
    return await this.communitiesService.findByUser(id);
  }

  @Put('members/:id')
  async addUserToCommunity(
    @Param('id') id,
    @Body('userid') userid,
    @Body('username') username: string,
  ) {
    return await this.communitiesService.addUser(id, { id: userid, username });
  }

  @Delete('members/:id')
  async removeUserToCommunity(
    @Param('id') id,
    @Body('userid') userid,
    @Body('username') username: string,
  ) {
    return await this.communitiesService.removeUser(id, {
      id: userid,
      username,
    });
  }
}
