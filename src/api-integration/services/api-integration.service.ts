import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiIntegrationService {
    constructor(private readonly httpService: HttpService){}

    async getGithubUsers() {
        const users = this.httpService
            .get(`https://api.github.com/users`)
            .pipe(
                map(response => response.data)
            );
        return users;
    }

    async getGithubUser(username: string) {
        const user = this.httpService
            .get(`https://api.github.com/users/${username}`)
            .pipe(
                map(response => response.data),
                map(data => (
                    {
                        username: data.login,
                        name: data.name,
                        repositories: data.repos_url,
                    }
                ))
            );
        return user;
    }
}
