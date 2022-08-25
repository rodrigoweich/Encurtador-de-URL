Com esse projeto, vamos aprender um pouco sobre as tecnologias Nest JS e Prisma. desde o conceito até o desenvolvimento prático de uma aplicação backend para encurtar o tamanho de uma URL.



🚀 Tecnologias utilizadas
- Nest JS → [https://nestjs.com/](https://nestjs.com/)
- Prisma → [https://www.prisma.io/](https://www.prisma.io/)
- Docker → [https://www.docker.com/](https://www.docker.com/)
- PostgreSQL → [https://www.postgresql.org/](https://www.postgresql.org/)
- Git → [https://git-scm.com/](https://git-scm.com/)
- GitHub → [https://github.com/](https://github.com/)



## Instalação

```bash
$ npm install
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes realizados
#### Client utilizado para os testes: Insomnia → [https://insomnia.rest/](https://insomnia.rest/)

Lista de prefixos que estão cadastrados para teste:

```json
[
  {
    "id_prefixo": 1,
    "ds_prefixo": "pfx-",
    "criado_em": "2022-08-25 12:10:40.016"
  },
  {
    "id_prefixo": 2,
    "ds_prefixo": "rdg.",
    "criado_em": "2022-08-25 12:10:40.016"
  }
]
```

Comando utilizado:

```sql
SELECT
    id_prefixo,
    ds_prefixo,
    criado_em
FROM public.prefixo;
```


### 1. Criando uma nova URL Curta

**URL para realizar a requisição**: http://127.0.0.1:3000/

Método: POST

```json
{
	"ds_url": "https://google.com.br/",
	"id_prefixo": 2
}
```

```bash
curl --request POST \
  --url http://127.0.0.1:3000/ \
  --header 'Content-Type: application/json' \
  --data '{
	"ds_url": "https://google.com.br/",
	"id_prefixo": 2
}'
```

Retorno esperado

```json
{
	"id_url": 1,
	"ds_url": "https://google.com.br/",
	"ds_url_encurtada": "rdg.zpm289c",
	"id_prefixo": 2,
	"criado_em": "2022-08-25T12:14:49.431Z"
}
```

### 2. Listando as URLs criadas

URL para realizar a requisição: http://127.0.0.1:3000/

Método: GET

```bash
curl --request GET \
  --url http://127.0.0.1:3000/
```

Esse endpoint não recebe parâmetros

…

Retorno esperado

```json
[
	{
		"ds_url": "https://google.com.br/",
		"ds_url_encurtada": "rdg.zpm289c",
		"criado_em": "2022-08-25T12:14:49.431Z",
		"prefixo": {
			"id_prefixo": 2,
			"ds_prefixo": "rdg.",
			"criado_em": "2022-08-25T12:10:40.016Z"
		}
	},
	{
		"ds_url": "https://globo.com.br/",
		"ds_url_encurtada": "pfx-9kqpzsp",
		"criado_em": "2022-08-25T12:16:23.258Z",
		"prefixo": {
			"id_prefixo": 1,
			"ds_prefixo": "pfx-",
			"criado_em": "2022-08-25T12:10:40.016Z"
		}
	},
	{
		"ds_url": "https://github.com/",
		"ds_url_encurtada": "96fym24",
		"criado_em": "2022-08-25T12:16:34.951Z",
		"prefixo": null
	}
]
```

### 3. Acessando a URL

URL para realizar a requisição: http://127.0.0.1:3000/:ds_url_encurtada

Método: GET

```bash
curl --request GET \
  --url http://127.0.0.1:3000/96fym24
```

Esse endpoint não recebe parâmetros

…

Retorno esperado

```bash
Usuário deve ser direcionado para o link original, se o mesmo existir
```

![Untitled](https://deeply-sunfish-b16.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fde1fe47f-16e0-4247-9552-73e663afacce%2FUntitled.png?table=block&id=5fb8e3f4-4ebd-4d19-a761-231525d8703b&spaceId=5b1be12e-62a6-4f11-87cb-a9b506d168e6&width=2000&userId=&cache=v2)

```json
[
	{
		"ds_url": "https://github.com/",
		"ds_url_encurtada": "96fym24",
		"criado_em": "2022-08-25T12:16:34.951Z",
		"prefixo": null
	}
]
```

### 4. Adicionais

Você pode usar sua criatividade para desenvolver algumas consultas utilizando SQL, e assim construir informações que possam ser úteis para os seus usuários, ou que possam lhe ajudar a ter um gerenciamento mais amplo sobre os dados da sua aplicação.

Como por exemplo, a consulta SQL abaixo:

```sql
SELECT
    u.id_url,
    u.ds_url,
    u.id_prefixo,
    p.ds_prefixo,
    u.ds_url_encurtada,
    COALESCE(REPLACE(u.ds_url_encurtada, p.ds_prefixo, '') , u.ds_url_encurtada) AS ds_url_encurtada_sem_prefixo,
    CONCAT('http://127.0.0.1:3000/', u.ds_url_encurtada) AS ds_url_para_acesso,
    u.criado_em AS url_criada_em,
    p.criado_em AS prefixo_criado_em
FROM public.url u
LEFT JOIN public.prefixo p ON u.id_prefixo = p.id_prefixo
ORDER BY u.id_url ASC;
```

O valor que ela retorna, utilizando nossa base de testes (extraída no formato JSON):

```json
[
  {
    "id_url": 1,
    "ds_url": "https://google.com.br/",
    "id_prefixo": 2,
    "ds_prefixo": "rdg.",
    "ds_url_encurtada": "rdg.zpm289c",
    "ds_url_encurtada_sem_prefixo": "zpm289c",
    "ds_url_para_acesso": "http://127.0.0.1:3000/rdg.zpm289c",
    "url_criada_em": "2022-08-25 12:14:49.431",
    "prefixo_criado_em": "2022-08-25 12:10:40.016"
  },
  {
    "id_url": 2,
    "ds_url": "https://globo.com.br/",
    "id_prefixo": 1,
    "ds_prefixo": "pfx-",
    "ds_url_encurtada": "pfx-9kqpzsp",
    "ds_url_encurtada_sem_prefixo": "9kqpzsp",
    "ds_url_para_acesso": "http://127.0.0.1:3000/pfx-9kqpzsp",
    "url_criada_em": "2022-08-25 12:16:23.258",
    "prefixo_criado_em": "2022-08-25 12:10:40.016"
  },
  {
    "id_url": 3,
    "ds_url": "https://github.com/",
    "id_prefixo": null,
    "ds_prefixo": null,
    "ds_url_encurtada": "96fym24",
    "ds_url_encurtada_sem_prefixo": "96fym24",
    "ds_url_para_acesso": "http://127.0.0.1:3000/96fym24",
    "url_criada_em": "2022-08-25 12:16:34.951",
    "prefixo_criado_em": null
  }
]
```
## Documentação detalhada
https://deeply-sunfish-b16.notion.site/Encurtador-de-URL-d409e29ce0324f02a721afff340e7239