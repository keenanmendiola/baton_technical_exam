import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksService } from '../services/bookmarks.service';
import { BookmarksController } from './bookmarks.controller';

describe('BookmarksController', () => {
  let controller: BookmarksController;

  const mockBookmarksService = {
    createBookmark: jest.fn().mockImplementation(dto => {
      return {
        id: Date.now()
      };
    }),
    getBookmarkById: jest.fn().mockImplementation(id => {
      return {
        id: 1,
        username: "mojombo",
        name: "Tom Preston-Werner",
        repositories_url: "https://github.com/mojombo",
        tag: "test"
      }
    }),
    getBookmarks: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          username: "mojombo",
          name: "Tom Preston-Werner",
          repositories_url: "https://github.com/mojombo",
          tag: "test"
        }
      ]
    }),
    getBookmarksByTags: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          username: "mojombo",
          name: "Tom Preston-Werner",
          repositories_url: "https://github.com/mojombo",
          tag: "backend notes"
        }
      ]
    }),
    updateBookmark: jest.fn().mockImplementation((criteria, value) => {
      return {
        message: "Bookmark successfully updated."
      }
    }),
    deleteBookmark: jest.fn().mockImplementation((id) => void {})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarksController],
      providers: [BookmarksService]
    })
    .overrideProvider(BookmarksService)
    .useValue(mockBookmarksService)
    .compile();

    controller = module.get<BookmarksController>(BookmarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save a bookmark', () => {
    it('should save a bookmark', () => {
      expect(controller.saveUserToBookmarks({
        username: "Test Username",
        name: "Test Name",
        repositories_url: "Test url",
        tag: "Test tag"
      })).toEqual({
        id: expect.any(Number)
      });
    });
  });

  describe('get a saved bookmark', () => {
    it('should a bookmark by id', () => {
      expect(controller.getUserFromBookmarks(1)).toEqual({
        id: expect.any(Number),
        username: expect.any(String),
        name: expect.any(String),
        repositories_url: expect.any(String),
        tag: expect.any(String)
      });
    });
  });

  describe('get saved bookmarks', () => {
    it('should return a list of bookmarks', () => {
      expect(controller.getUsersBookmarks()).toEqual([{
        id: expect.any(Number),
        username: expect.any(String),
        name: expect.any(String),
        repositories_url: expect.any(String),
        tag: expect.any(String)
      }]);
    })
  });

  describe('get saved bookmarks by tags', () => {
    it('should return a list of bookmarks according to tag', () => {
      expect(controller.getBookmarksByTags('backend notes')).toEqual([{
        id: expect.any(Number),
        username: expect.any(String),
        name: expect.any(String),
        repositories_url: expect.any(String),
        tag: expect.any(String)
      }]);
    })
  });

  describe('delete a bookmark', () => {
    it('should return void', () => {
      expect(controller.deleteBookmark(1)).toEqual(void 0);
    })
  })

  describe('update a bookmark', () => {
    it("should update a bookmark", () => {
      expect(controller.updateBookmark(1, {tag: "Test tag"})).toEqual({
        message: "Bookmark successfully updated."
      });
    });
  });
});
