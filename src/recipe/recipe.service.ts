import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Recipe } from './recipe.entity';
import { IngredientsService } from '../ingredient/ingredient.service';
import { InstructionsService } from '../instruction/instruction.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    private ingredientsService: IngredientsService,
    private instructionsService: InstructionsService,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id): Promise<Recipe | null> {
    return await this.recipeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async findByQuery(query): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      where: [
        {
          name: ILike(query),
        },
        {
          ingredients: {
            name: ILike(query),
          },
        },
      ],
      relations: {
        user: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async findOneByUser(user): Promise<Recipe | null> {
    return await this.recipeRepository.findOne({
      select: {
        id: true,
        name: true,
      },

      where: {
        user: user,
      },
      relations: {
        user: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async findByUser(user): Promise<Recipe[]> {
    return await this.recipeRepository.find({
      select: {
        id: true,
        name: true,
      },

      where: {
        user: user,
      },
      relations: {
        user: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async create(body): Promise<Recipe | null> {
    let { instructions, ingredients, ...result } = body;
    const recipe = await this.recipeRepository.save(result);
    for (let i = 0; i < instructions?.length; i++) {
      this.instructionsService.create({ ...instructions[i], recipe: recipe });
    }

    for (let i = 0; i < ingredients?.length; i++) {
      this.ingredientsService.create({ ...ingredients[i], recipe: recipe });
    }

    return { ...recipe, ingredients: ingredients, instructions: instructions };
  }

  async update(id, body): Promise<any> {
    const { instructions, ingredients, toBeDeleted, ...recipe } = body;
    
    if (ingredients) {
      //delete unavailable ingredients
      if (toBeDeleted?.ingredients.length > 0) {
        toBeDeleted.ingredients.forEach((ingredient) => {
          this.ingredientsService.delete(ingredient.id);
        });
      }

      await this.ingredientsService.bulkUpdate(ingredients, recipe);
    }

    if (instructions) {
      //delete unavailable instructions
      if (toBeDeleted?.instructions.length > 0) {
        toBeDeleted.instructions.forEach((instruction) => {
          this.instructionsService.delete(instruction.id);
        });
      }

      await this.instructionsService.bulkUpdate(instructions, recipe);
    }

    return await this.recipeRepository.update(id, recipe);
  }

  async delete(id): Promise<any> {
    this.recipeRepository.delete(id);
  }
}
