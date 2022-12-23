import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiIntegrationService } from './api-integration.service';

describe('ApiIntegrationService', () => {
  let service: ApiIntegrationService;

  const mockHttpService = {
    get: jest.fn().mockImplementation((url) => {}),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiIntegrationService, HttpService],
    })
    .overrideProvider(HttpService)
    .useValue(mockHttpService).compile();

    service = module.get<ApiIntegrationService>(ApiIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('get github users', () => {
  //   it('should return a list of github users', async () => {
  //     expect(async service.getGithubUsers());
  //   })
  // });
});
