import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { InstructionsService } from './instruction.service';

@Controller('instruction')
export class InstructionsController {
  constructor(private instructionsService: InstructionsService) {}

  @Get()
  async findAllInstructions() {
    return await this.instructionsService.findAll();
  }

  @Get(':id')
  async findInstruction(@Param('id') id) {
    return await this.instructionsService.findOneById(id);
  }

  @Get(':recipe')
  async findRecipeInstructions(@Param('recipe') recipe) {
    return await this.instructionsService.findByRecipe(recipe);
  }

  @Post()
  async createInstruction(
    @Body('id') id,
    @Body('instruction') instruction: string,
    @Body('recipe') recipe,
  ) {
    return await this.instructionsService.create({
      id: id,
      instruction: instruction,
      recipe: recipe,
    });
  }

  @Delete()
  async deleteInstruction(id) {
    return await this.instructionsService.delete(id);
  }
}
