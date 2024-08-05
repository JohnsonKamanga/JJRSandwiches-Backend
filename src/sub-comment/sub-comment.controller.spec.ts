import { Test, TestingModule } from '@nestjs/testing';
import { SubCommentController } from './sub-comment.controller';

describe('SubCommentController', () => {
  let controller: SubCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCommentController],
    }).compile();

    controller = module.get<SubCommentController>(SubCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
