import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(private readonly prismaService: PrismaService) {}

  geraUrlCurta() {
    return Math.random().toString(36).substring(2, 9);
  }

  async create(createUrlDto: CreateUrlDto) {
    const urlJaExiste = await this.prismaService.url.findFirst({
      where: {
        ds_url: createUrlDto.ds_url,
      },
    });

    if (urlJaExiste) {
      throw new HttpException(
        `Essa URL já existe, utilize o link encurtado: ${urlJaExiste.ds_url_encurtada}`,
        HttpStatus.CONFLICT,
      );
    }

    let urlCurta = this.geraUrlCurta();
    const urlCurtaJaExiste = await this.prismaService.url.findUnique({
      where: {
        ds_url_encurtada: urlCurta,
      },
    });
    while (urlCurtaJaExiste) {
      urlCurta = this.geraUrlCurta();
    }

    if (createUrlDto.id_prefixo != null) {
      const prefixo = await this.prismaService.prefixo.findUnique({
        where: {
          id_prefixo: createUrlDto.id_prefixo,
        },
        select: {
          ds_prefixo: true,
        },
      });
      urlCurta = prefixo.ds_prefixo + urlCurta;
    }

    return this.prismaService.url.create({
      data: {
        ds_url: createUrlDto.ds_url,
        ds_url_encurtada: urlCurta,
        id_prefixo: createUrlDto.id_prefixo,
      },
    });
  }

  findAll() {
    return this.prismaService.url.findMany({
      select: {
        id_url: false,
        ds_url: true,
        ds_url_encurtada: true,
        id_prefixo: false,
        criado_em: true,
        prefixo: true,
      },
    });
  }

  redirectTo(ds_url_encurtada: string) {
    return this.prismaService.url.findUnique({
      where: {
        ds_url_encurtada,
      },
      select: {
        id_url: false,
        ds_url: true,
        ds_url_encurtada: false,
        id_prefixo: false,
        criado_em: false,
        prefixo: false,
      },
    });
  }
}
