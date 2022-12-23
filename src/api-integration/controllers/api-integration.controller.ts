import { Controller, Get, Param } from '@nestjs/common';
import { ApiIntegrationService } from '../services/api-integration.service';

@Controller('api-integration')
export class ApiIntegrationController {
    constructor(private readonly apiService: ApiIntegrationService){}

    @Get('/github')
    getGithubusers(){
        const results = this.apiService.getGithubUsers();
        return results;
    }

    @Get('/github/:username')
    getGithubUser(@Param('username') user: string){
        const result = this.apiService.getGithubUser(user);
        return result;
    }
}
