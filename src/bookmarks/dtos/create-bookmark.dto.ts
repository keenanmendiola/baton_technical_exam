import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBookmarkDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUrl()
    repositories_url: string;

    @IsNotEmpty()
    @IsString()
    tag: string;
}