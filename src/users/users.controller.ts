import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { genSalt, hash } from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { Readable } from 'stream';
import { Response } from 'express';
import { extname } from 'node:path/posix';

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

    @Get('profile-picture/:username')
    async getProfilePicture(@Param('username')username: string, @Res()res : Response ){
        const user = await this.userService.findOne(username);
        let path = '../uploads/profile-pictures/default-user-picture.jpg';
        if(user.profilePicture !== '')
            path = user.profilePicture;
        const file = readFileSync(path);
        const stream = new Readable();
        res.contentType(`image/${path.split('.').pop()}`);
        stream.push(file);
        stream.push(null);
        stream.pipe(res);
    }

    @Delete(':id')
    async removeUser(@Param('id')id : number){

        return await this.userService.remove(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('profilePicture',{
        storage:diskStorage({
            filename:(req,file,cb)=>{
                cb(null,Date.now() + extname(file.originalname));
            },
            destination:"../uploads/profile-pictures"
        })
    }))
    async createUser(
        @UploadedFile()file: Express.Multer.File, @Req() request: Request
    ){     
    
        //generate password salt
        const salt = await genSalt(10);
    
        //use salt to generate hashed password
        const password = await hash(request.body['password'], salt);

        return await this.userService.create({...request.body, password, profilePicture: file?.path});
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('profilePicture',{
        storage:diskStorage({
            filename:(req,file,callback)=>{
                callback(null,Date.now() + extname(file.originalname));
            },
            destination:"../uploads/profile-pictures"
        })
    }))
    @Put(':id')
    async update(
        @UploadedFile()file: Express.Multer.File,
        @Param('id') id: number,
        @Req() request: Request
    ){
        return this.userService.update(id, {...request.body, profilePicture:file?.path});
    }
}
