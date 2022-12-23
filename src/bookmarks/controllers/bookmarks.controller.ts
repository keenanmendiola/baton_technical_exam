import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { UpdateTagParam } from '../params/update-tag.params';
import { BookmarksService } from '../services/bookmarks.service';

@SkipThrottle()
@Controller('bookmarks')
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService){}

    @Post('/save')
    @UsePipes(ValidationPipe)
    saveUserToBookmarks(@Body() bookmark: CreateBookmarkDto){
        return this.bookmarksService.createBookmark(bookmark);
    }

    @Get('/saved')
    getUsersBookmarks(){
        return this.bookmarksService.getBookmarks();
    }

    @Get('/saved/:id')
    getUserFromBookmarks(@Param('id', ParseIntPipe) id: number){
        return this.bookmarksService.getBookmarkById(id);
    }
    
    @Get('/tags/:tag')
    getBookmarksByTags(@Param('tag') tag: string){
        return this.bookmarksService.getBookmarksByTags(tag);
    }

    @Patch('/update/:id')
    updateBookmark(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTagParam){
        return this.bookmarksService.updateBookmark(id, body.tag);
    }

    @Delete('/delete/:id')
    deleteBookmark(@Param('id', ParseIntPipe) id: number){
        return this.bookmarksService.deleteBookmark(id);
    }
}
