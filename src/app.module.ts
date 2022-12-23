import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ApiIntegrationModule } from './api-integration/api-integration.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
              TypeOrmModule.forRoot(typeOrmConfig),  
              ThrottlerModule.forRoot({
                ttl: 2.628e+6,
                limit: 20,
              }),
              BookmarksModule, ApiIntegrationModule
          ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    ],
})
export class AppModule {}
