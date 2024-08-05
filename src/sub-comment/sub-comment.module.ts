import { Module } from '@nestjs/common';
import { SubCommentService } from './sub-comment.service';
import { SubCommentController } from './sub-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubComment } from './sub-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubComment])],
  providers: [SubCommentService],
  controllers: [SubCommentController],
  exports: [SubCommentService]
})
export class SubCommentModule {}
