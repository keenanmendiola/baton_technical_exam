import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'github_bookmarks',
    entities: ["dist/**/*.entity.js"],
    synchronize: true 
}