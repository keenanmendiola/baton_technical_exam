import { Test, TestingModule } from '@nestjs/testing';
import { ApiIntegrationService } from '../services/api-integration.service';
import { ApiIntegrationController } from './api-integration.controller';

describe('ApiIntegrationController', () => {
  let controller: ApiIntegrationController;

  const mockApiIntegrationService = {
    getGithubUsers: jest.fn().mockImplementation(() => []),
    getGithubUser: jest.fn().mockImplementation(username => {
      return {
        username: "defunkt",
        name: "Chris Wanstrath",
        repositories: "https://api.github.com/users/defunkt/repos"
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiIntegrationController],
      providers: [ApiIntegrationService]
    })
    .overrideProvider(ApiIntegrationService)
    .useValue(mockApiIntegrationService)
    .compile();

    controller = module.get<ApiIntegrationController>(ApiIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get github users', () => {
    it('should return a list of github users', () => {
      expect(controller.getGithubusers()).toEqual([]);
    })
  });

  describe('Get github user by username', () => {
    it('should return a github user', () => {
      expect(controller.getGithubUser("test")).toEqual({
        username: expect.any(String),
        name: expect.any(String),
        repositories: expect.any(String)
      });
    })
  });
});
