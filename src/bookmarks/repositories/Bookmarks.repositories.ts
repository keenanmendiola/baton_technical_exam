import { EntityRepository, Repository } from "typeorm";
import { Bookmark } from "../bookmark.entity";

@EntityRepository(Bookmark)
export class BookmarksRepository extends Repository<Bookmark>{

}