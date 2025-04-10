import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { Url } from './urls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule {}
