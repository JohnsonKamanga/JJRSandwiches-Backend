import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  async findOneById(id): Promise<Ingredient | null> {
    return await this.ingredientRepository.findOneBy({ id });
  }

  async findOneByRecipe(recipe): Promise<Ingredient[] | null> {
    return await this.ingredientRepository.find({
      where: {
        recipe: recipe,
      },
      relations: {
        recipe: true,
      },
    });
  }

  async create(body): Promise<any> {
    return await this.ingredientRepository.save(body);
  }

  async update(id, body): Promise<any>{
    return await this.ingredientRepository.update(id,body);
  }

  async bulkUpdate(ingredients: any[], recipe): Promise<any>{
    for(let i = 0; i < ingredients.length ; i++){
      ingredients[i] = {...ingredients[i], recipe};
    }
    return await this.ingredientRepository.save(ingredients);
  }

  async delete(id): Promise<any> {
    return await this.ingredientRepository.delete(id);
  }
}
