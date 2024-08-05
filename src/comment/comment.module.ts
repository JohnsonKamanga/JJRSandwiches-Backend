import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { SubCommentModule } from '../sub-comment/sub-comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), SubCommentModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
