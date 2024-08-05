import { Recipe } from '../recipe/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:'', type: "text"})
  instruction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions, {
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}
