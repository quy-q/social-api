import { Test, TestingModule } from '@nestjs/testing';
import { RecommentService } from './recomment.service';

describe('RecommentService', () => {
  let service: RecommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommentService],
    }).compile();

    service = module.get<RecommentService>(RecommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
