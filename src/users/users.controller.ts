import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { genSalt, hash } from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { Readable } from 'stream';
import { Response } from 'express';
import { extname } from 'node:path/posix';
import {v2 as cloudinary} from 'cloudinary';
import { uploadFile } from 'src/cloudinaryConfig';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService ){

    }

    @Get()
    async getUsers(){
        return await this.userService.findAll();
    }

    @Get(':username')
    async getUser(@Param('username')username: string){
        return await this.userService.findOne(username);
    }

    @Get('user/:id')
    async getUserByID(@Param('id')id:number){
        return await this.userService.findOneByID(id);
    }

    @Delete(':id')
    async removeUser(@Param('id')id : number){

        return await this.userService.remove(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('profilePicture',{
        storage:memoryStorage()
    }))
    async createUser(
        @UploadedFile()file: Express.Multer.File, @Req() request: Request
    ){     
        let uploadResult;
        if(file){
            uploadResult = await uploadFile(file.buffer,'uploads/profile-pictures' );
        
        ;}
    
        //generate password salt
        const salt = await genSalt(10);
    
        //use salt to generate hashed password
        const password = await hash(request.body['password'], salt);

        return await this.userService.create({...request.body, password, profilePicture: uploadResult?.secure_url});
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('profilePicture',{
        storage:memoryStorage(),
    }))
    @Put(':id')
    async update(
        @UploadedFile()file: Express.Multer.File,
        @Param('id') id: number,
        @Req() request: Request
    ){
        let uploadResult;
        if(file){
            uploadResult = await uploadFile(file.buffer,'uploads/profile-pictures' );
        
        ;}
        return this.userService.update(id, {...request.body, profilePicture: uploadResult?.secure_url});
    }
}
