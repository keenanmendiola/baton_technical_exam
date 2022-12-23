import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiIntegrationController } from './controllers/api-integration.controller';
import { ApiIntegrationService } from './services/api-integration.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiIntegrationController],
  providers: [ApiIntegrationService]
})
export class ApiIntegrationModule {}
