import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { BookmarksController } from './controllers/bookmarks.controller';
import { BookmarksService } from './services/bookmarks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarksService],
  controllers: [BookmarksController]
})
export class BookmarksModule {}
