import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IngredientsService } from './ingredient.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Get()
  async findAllIngredients() {
    return await this.ingredientsService.findAll();
  }

  @Get(':id')
  async findIngredient(@Param('id') id) {
    return await this.ingredientsService.findOneById(id);
  }

  @Get(':recipe')
  async findRecipeIngredients(@Param('recipe') recipe) {
    return await this.ingredientsService.findOneByRecipe(recipe);
  }

  @Post()
  async createIngredient(
    @Body('id') identity,
    @Body('ingredient') ingredient,
    @Body('recipe') recipe,
  ) {
    return await this.ingredientsService.create({
      id: identity,
      ingredient: ingredient,
      recipe: recipe,
    });
  }

  @Delete()
  async deleteInstruction(@Body('id') id) {
    return await this.ingredientsService.delete(id);
  }
}
