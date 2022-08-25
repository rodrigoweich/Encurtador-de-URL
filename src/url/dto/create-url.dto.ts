import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty({ message: 'O campo não pode ser vazio' })
  @IsUrl(undefined, { message: 'O valor informado não é válido' })
  ds_url: string;

  @IsOptional()
  @IsNumber()
  id_prefixo: number;
}
