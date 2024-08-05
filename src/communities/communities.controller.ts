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
import { diskStorage } from 'multer';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { Response } from 'express';

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

  @Get('community-pictures/:id')
  async getPicture(@Param('id')id, @Res()res: Response){
    const community = await this.communitiesService.findByID(id);
        let path = 'src/uploads/community-pictures/default-community-picture.jpg';
        if(community.communityPicture !== '')
        path = community.communityPicture;
        const file = readFileSync(path);
        res.contentType(`image/${path.split('.').pop()}`);
        const stream = new Readable();
        stream.push(file);
        stream.push(null);
        stream.pipe(res);
  }

  @Get('members/:id')
  async findCommunityMembers(@Param('id') id) {
    return await this.communitiesService.findUsers(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('communityPicture',{
    storage:diskStorage({
        filename:(req,file,cb)=>{
            cb(null,Date.now() + extname(file.originalname));
        },
        destination:"src/uploads/community-pictures"
    })
}))

  async createCommunity(
    @UploadedFile()file: Express.Multer.File, @Req() request: Request
  ){
    return await this.communitiesService.create({...request.body, communityPicture: file?.path});
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image',{
   storage:diskStorage({
    filename:(req,file,cb)=>{
      cb(null,Date.now() + extname(file.originalname));
    },
    destination:"src/uploads/community-pictures"
   }),
  }))
  async update(@UploadedFile()file: Express.Multer.File, @Param('id')id, @Req() request: Request){
    if(file.originalname === '' ){
      return await this.communitiesService.update(id, request.body);
    }

    return await this.communitiesService.update(id, {...request.body, image: file.path})
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
