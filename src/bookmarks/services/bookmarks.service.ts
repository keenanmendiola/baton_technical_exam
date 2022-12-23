import { HttpService } from '@nestjs/axios/dist';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Bookmark } from '../bookmark.entity';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';

@Injectable()
export class BookmarksService {
    constructor(
        @InjectRepository(Bookmark) private bookmarksRepository: Repository<Bookmark>
        ){}

    async getBookmarks(): Promise<Bookmark[]>{
        try{
            const result = await this.bookmarksRepository.find();
            return result;
        }catch(error){
            //handle error
        }
    }

    async getBookmarkById(id: number): Promise<Bookmark>{
        try{
            const bookmark = await this.bookmarksRepository.findOneBy({id});
            if(!bookmark){
                throw new NotFoundException(`Bookmark of id ${id} not found.`);
            }
            return bookmark;
        }catch(error){
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    async createBookmark(bookmark: CreateBookmarkDto): Promise<{}> {
        try{
            const newBookmark = this.bookmarksRepository.create({
                ...bookmark
            });
            const result = await this.bookmarksRepository.save(newBookmark);
            return {
                id: result.id
            }
        }catch(error){
            //handle error
        }
    }

    async deleteBookmark(id: number): Promise<void>{
        try{
            const bookmark = this.getBookmarkById(id);
            await this.bookmarksRepository.delete({id});
        }catch(error){
            //handle error
        }
    }

    async updateBookmark(id: number, tag: string): Promise<{}>{
        try{
            const bookmark = this.getBookmarkById(id);
            const result = await this.bookmarksRepository.update({id}, {tag});

            return {
                message: "Bookmark successfully updated."
            }
        }catch(error){
            //handle error
        }
    }

    async getBookmarksByTags(tag: string): Promise<Bookmark[]>{
        try{
            return await this.bookmarksRepository.find({
                where: {
                    tag: tag
                }
            });
        }catch(error){
            //handle error
        }
    }
}
