import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { nanoid } from 'nanoid';

export class ShortenUrl {
  full: string;
}

export class RedirectParam {
  url: string;
}

@Controller('url')
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Get(':url')
  @Redirect()
  async redirectUrl(@Param() params: RedirectParam) {
    if (params && params.url) {
      const url = await this.urlsService.findBy({ minified: params.url });
      if (url) return { url: url.full };
    }
    return { url: '/not-found', statusCode: 302 };
  }

  @Get('')
  findAll(): string {
    return 'This action returns all urls';
  }

  @Post('/shorten')
  async shorten(@Body() shortenUrl: ShortenUrl): Promise<string> {
    if (!shortenUrl.full) throw new NotFoundException('Invalid param');

    const data = await this.urlsService.findBy({ full: shortenUrl.full });
    console.log('DATA', data);
    console.log('Params :', shortenUrl);
    if (data) {
      return JSON.stringify({ minified: data.minified});
    } else {
      const minified = nanoid();
      await this.urlsService.create({
        full: shortenUrl.full,
        minified: minified,
      });
      return JSON.stringify({ minified: minified});
    }
  }
}
