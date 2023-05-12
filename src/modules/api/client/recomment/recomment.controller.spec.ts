import { Test, TestingModule } from '@nestjs/testing';
import { RecommentController } from './recomment.controller';
import { RecommentService } from './recomment.service';

describe('RecommentController', () => {
  let controller: RecommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommentController],
      providers: [RecommentService],
    }).compile();

    controller = module.get<RecommentController>(RecommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
