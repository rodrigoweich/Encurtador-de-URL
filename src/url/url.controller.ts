import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':ds_url_encurtada')
  async redirectTo(
    @Param('ds_url_encurtada') ds_url_encurtada: string,
    @Res() res: Response,
  ) {
    const link = await this.urlService.redirectTo(ds_url_encurtada);
    return res.redirect(301, link['ds_url']);
  }
}
