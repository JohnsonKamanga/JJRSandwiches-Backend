import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'node:path/posix';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { Response } from 'express';
import { uploadFile } from 'src/cloudinaryConfig';

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


  @Get(':id')
  async findRecipe(@Param('id') id) {
    return await this.recipeService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image',{
    storage:memoryStorage()
}))
  async createRecipe(
    @UploadedFile()file: Express.Multer.File, @Req() request: Request
  ){
    let uploadResult;
        if(file){
            uploadResult = await uploadFile(file.buffer,'uploads/recipe-pictures' );
        
        }

    return await this.recipeService.create({...request.body, image: uploadResult?.secure_url});
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image',{
    storage:memoryStorage(),
  }))
  async update(@UploadedFile()file: Express.Multer.File, @Param('id')id, @Req() request: Request){
    let uploadResult;
        if(file){
            uploadResult = await uploadFile(file.buffer,'uploads/recipe-pictures' );
        
        }
    return await this.recipeService.update(id, {...request.body, image: uploadResult?.secure_url})
  }

  @Delete(':id')
  async deleteRecipe(@Param('id')id){
    return await this.recipeService.delete(id);
  }
}
