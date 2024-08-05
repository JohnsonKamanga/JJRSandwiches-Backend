import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './instruction.entity';
import { InstructionsService } from './instruction.service';
import { InstructionsController } from './instruction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction])],
  providers: [InstructionsService],
  controllers: [InstructionsController],
  exports: [InstructionsService]
})
export class InstructionsModule {}
