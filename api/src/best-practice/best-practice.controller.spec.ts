import { Test, TestingModule } from '@nestjs/testing';
import { BestPracticeController } from './best-practice.controller';
import { BestPracticeService } from './best-practice.service';

describe('BestPracticeController', () => {
  let controller: BestPracticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BestPracticeController],
      providers: [BestPracticeService],
    }).compile();

    controller = module.get<BestPracticeController>(BestPracticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
