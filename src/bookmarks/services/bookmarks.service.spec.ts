import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bookmark } from '../bookmark.entity';
import { BookmarksService } from './bookmarks.service';

describe('BookmarksService', () => {
  let service: BookmarksService;
  const mockBookmarksRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({id: Date.now(), ...user})),
    findOneBy: jest.fn().mockImplementation(id => Promise.resolve(
      {
        id: 1,
        username: "mojombo",
        name: "Tom Preston-Werner",
        repositories_url: "https://github.com/mojombo",
        tag: "test"
      })),
    find: jest.fn().mockImplementation(() => Promise.resolve([
      {
        id: 1,
        username: "mojombo",
        name: "Tom Preston-Werner",
        repositories_url: "https://github.com/mojombo",
        tag: "test"
      }
    ])),
    delete: jest.fn().mockImplementation((id) => void {}),
    update: jest.fn().mockImplementation((criteria, value) => {
      return {
        message: "Bookmark successfully updated."
      }
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarksService,
      {
        provide: getRepositoryToken(Bookmark),
        useValue: mockBookmarksRepository
      }],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a new bookmark', () => { 
    it('should save a new bookmark and return new bookmark', async () => {
      expect(await service.createBookmark({
        username: "Test Username",
        name: "Test Name",
        repositories_url: "Test url",
        tag: "Test tag"
      }))
      .toEqual(
        {
          id: expect.any(Number),
        })});
   });

   describe('get a bookmark by id', () => {
    it('should return a new bookmark using the id', async () => {
      expect(await service.getBookmarkById(1)).toEqual({
        id: expect.any(Number),
        username: expect.any(String),
        name: expect.any(String),
        repositories_url: expect.any(String),
        tag: expect.any(String)
      })
    });
   });

   describe('get bookmarks', () => {
    it('should return a list of bookmarks', async () => {
      expect(await service.getBookmarks()).toEqual([
        {
          id: expect.any(Number),
          username: expect.any(String),
          name: expect.any(String),
          repositories_url: expect.any(String),
          tag: expect.any(String)}
      ])
    });
   });

   describe('get bookmarks by tag', () => {
    it('should return a list of bookmarks based on tag', async () => {
      expect(await service.getBookmarksByTags('test')).toEqual([
        {
          id: expect.any(Number),
          username: expect.any(String),
          name: expect.any(String),
          repositories_url: expect.any(String),
          tag: expect.any(String)}
      ])
    });
   });

   describe('delete a bookmark by id', () => {
    it('should return void', async () => {
      expect(await service.deleteBookmark(1)).toEqual(void 0);
    });
   });

   describe('update a bookmark tag', () => {
    it('should succesfully update a bookmark', async () => {
      expect(await service.updateBookmark(1, "Test tag")).toEqual({
        message: "Bookmark successfully updated."
      });
    })
   });
});
