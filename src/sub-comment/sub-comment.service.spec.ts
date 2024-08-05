import { Test, TestingModule } from '@nestjs/testing';
import { SubCommentService } from './sub-comment.service';

describe('SubCommentService', () => {
  let service: SubCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCommentService],
    }).compile();

    service = module.get<SubCommentService>(SubCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
