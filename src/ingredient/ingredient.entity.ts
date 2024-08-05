import { Recipe } from '../recipe/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:'', type: "text"})
  name: string;

  @Column({default:'', type: "text"})
  quantity: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}
