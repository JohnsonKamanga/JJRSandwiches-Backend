import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instruction } from './instruction.entity';

@Injectable()
export class InstructionsService {
  constructor(
    @InjectRepository(Instruction)
    private instructionRepository: Repository<Instruction>,
  ) {}

  async findAll(): Promise<Instruction[]> {
    return await this.instructionRepository.find();
  }

  async findOneById(id): Promise<Instruction | null> {
    return await this.instructionRepository.findOneBy(id);
  }

  async findByRecipe(recipe): Promise<Instruction[]> {
    return await this.instructionRepository.find({
      where: {
        recipe: recipe,
      },
      relations: {
        recipe: true,
      },
    });
  }

  async delete(id): Promise<any> {
    return this.instructionRepository.delete(id);
  }

  async create(body): Promise<Instruction> {
    return await this.instructionRepository.save(body);
  }

  async update(id,body): Promise <any>{
    return await this.instructionRepository.update(id,body);
  }

  async bulkUpdate(instructions: any[], recipe): Promise<any>{
      for(let i = 0 ; i < instructions.length ; i++){
        instructions[i].recipe = recipe;
      }

      return await this.instructionRepository.save(instructions)
  }
}
