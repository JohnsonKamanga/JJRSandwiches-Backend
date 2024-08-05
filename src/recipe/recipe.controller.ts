import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path/posix';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { Response } from 'express';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('all')
  async findAllRecipes() {
    return await this.recipeService.findAll();
  }


  @Get()
  async findRecipeByUser(@Body('user') user) {
    return await this.recipeService.findOneByUser(user);
  }

  @Get('user/:id')
  async findRecipesByUser(@Param('id')id){
    return await this.recipeService.findByUser({id});
  }

  @Get('search')
  async findQueryResults(@Query('query')query?: string){
    return await this.recipeService.findByQuery(query);
  }


  @Get('recipe-pictures/:id')
    async getProfilePicture(@Param('id')id, @Res()res : Response ){
        const recipe = await this.recipeService.findOne(id);
        let path = 'src/uploads/recipe-pictures/default-recipe-picture.jpg';
        if(recipe.image !== '')
        path = recipe.image;
        const file = readFileSync(path);
        res.contentType(`image/${path.split('.').pop()}`);
        const stream = new Readable();
        stream.push(file);
        stream.push(null);
        stream.pipe(res);
    }
  
  @Get(':id')
  async findRecipe(@Param('id') id) {
    return await this.recipeService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
        filename:(req,file,cb)=>{
            cb(null,Date.now() + extname(file.originalname));
        },
        destination:"src/uploads/recipe-pictures"
    })
}))
  async createRecipe(
    @UploadedFile()file: Express.Multer.File, @Req() request: Request
  ){
    return await this.recipeService.create({...request.body, image: file?.path});
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image',{
   storage:diskStorage({
    filename:(req,file,cb)=>{
      cb(null,Date.now() + extname(file.originalname));
    },
    destination:"src/uploads/recipe-pictures"
   }),
  }))
  async update(@UploadedFile()file: Express.Multer.File, @Param('id')id, @Req() request: Request){
    
    return await this.recipeService.update(id, {...request.body, image: file?.path})
  }

  @Delete(':id')
  async deleteRecipe(@Param('id')id){
    return await this.recipeService.delete(id);
  }
}
