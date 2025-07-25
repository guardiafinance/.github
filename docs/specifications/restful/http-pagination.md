---
sidebar_position: 4
---

# Paginação

Esta especificação define um padrão unificado de **paginação** para todos os endpoints de APIs RESTful da Guardia que retornam listas de recursos. O objetivo é garantir consistência entre interfaces, previsibilidade no consumo de dados e interoperabilidade entre sistemas internos e externos.

Padronizar a paginação **evita sobrecargas sistêmicas**, melhora o tempo de resposta e reduz o uso de recursos computacionais. Está alinhada aos princípios de [Compliance by Design](../../community/governance/COMPLIANCE.md), como:

  - *Eficiência*: por meio de mecanismos de paginação eficientes, com minimização de dados, evitando retornos excessivos.
  - *Transparência e auditabilidade*: proporcionando respostas estruturadas e rastreáveis.
  - *Previsibilidade*: permitindo que os consumidores prevejam o comportamento e o resultado das operações de paginação.

Suporta **integrações eficientes** com ferramentas externas e promove reutilização de componentes internos.

## Requisição

Os sistemas da Guardia DEVEM oferecer os seguintes mecanismos de paginação:

| Parâmetro                       | Tipo    | Padrão      | Máximo  |
|---------------------------------|---------|-------------|---------|
| [`page_size`](#page_size)       | uint32  | 20          | 100     |
| [`page_token`](#page_token)     | string  | -           | -       |
| [`order_by`](#order_by)         | string  | created_at  | -       |
| [`sort`](#sort)                 | string  | asc         | -       |

### Parâmetros de paginação

Os sistemas que expõem recursos pagináveis DEVEM implementar os seguintes parâmetros de controle de paginação. Esses parâmetros DEVEM ser aceitos via query string em endpoints compatíveis com paginação.

#### `page_size`
- DEVE ser um número inteiro representando a quantidade de itens por página.
- QUANDO não especificado, DEVE assumir o valor padrão de `20`.
- NÃO DEVE exceder o valor máximo de `100`.
- Solicitações com valores acima do limite DEVEM ser rejeitadas com erro de validação.

#### `page_token`
- DEVE ser um token opaco que represente a posição corrente da paginação.
- DEVE ser retornado pelo sistema em chamadas anteriores, quando aplicável.
- O formato e semântica do token são de responsabilidade do sistema e DEVEM ser tratados como opacos pelo cliente.

#### `order_by`
- DEVE ser uma string indicando o modo de ordenação dos resultados.
- QUANDO não informado, DEVE assumir o valor padrão `created_at`.
- VALORES permitidos incluem `created_at`, `updated_at` e `reference_at`.
- QUALQUER outro valor informado DEVE ser rejeitado com erro de validação.

#### `sort`
- DEVE ser uma string indicando a direção da ordenação.
- VALORES permitidos são `asc` (ordem crescente) e `desc` (ordem decrescente).
- QUANDO não informado, DEVE assumir `asc`.

## Resposta

A resposta DEVE conter os seguintes propriedades:

| Propriedade                                                                 | Tipo   |
|-----------------------------------------------------------------------------|--------|
| [`data`](#data)                                                             | array  |
| [`pagination`](#pagination)                                                 | object |
| [`pagination.page_size`](#paginationpage_size)                             | uint32 |
| [`pagination.total_count`](#paginationtotal_count)                         | uint32 |
| [`pagination.first_page_token`](#paginationfirst_page_token)               | string |
| [`pagination.previous_page_token`](#paginationprevious_page_token)         | string |
| [`pagination.next_page_token`](#paginationnext_page_token)                 | string |
| [`pagination.last_page_token`](#paginationlast_page_token)                 | string |


### Estrutura do Payload

As respostas de endpoints que implementam paginação DEVEM seguir a estrutura abaixo. O objeto `pagination` DEVE conter os metadados necessários para navegação entre páginas de forma segura, eficiente e independente de estado no servidor.

#### `data`
- DEVE ser um array contendo os itens da página atual.
- CADA item DEVE seguir a estrutura de recurso definida para o endpoint consultado.

#### `pagination`
- DEVE ser um objeto contendo os metadados de paginação.
- Todas as propriedades de `pagination` DEVEM estar presentes, ainda que nulas quando não aplicáveis.

##### `pagination.page_size`
- DEVE ser um inteiro positivo (`uint32`) representando o número de itens por página na resposta.

##### `pagination.total_count`
- DEVE ser um inteiro positivo (`uint32`) representando o número total de registros disponíveis na consulta original.
- PODE ser omitido em cenários de paginação altamente escaláveis onde a contagem completa afete a performance.

##### `pagination.first_page_token`
- PODE ser uma string representando o token da primeira página.
- DEVE ser tratado como um recurso auxiliar para clientes que desejem reiniciar a navegação.

##### `pagination.previous_page_token`
- PODE ser uma string representando o token da página anterior.
- QUANDO ausente ou nulo, indica que esta é a primeira página da sequência.

##### `pagination.next_page_token`
- PODE ser uma string representando o token da próxima página.
- QUANDO ausente ou nulo, indica que não há mais páginas seguintes.

##### `pagination.last_page_token`
- PODE ser uma string representando o token da última página.
- DEVE ser utilizado opcionalmente por clientes para saltar ao final da sequência.


#### Exemplo em JSON
```json
{
  "data": [
    { "id": "abc", "name": "Item A" },
    { "id": "def", "name": "Item B" }
  ],
  "pagination": {
    "page_size": 20,
    "total_count": 200,
    "first_page_token": "eyJhbGciOi...",
    "previous_page_token": "eyJhbGciOi...",
    "next_page_token": "eyJhbGciOi...",
    "last_page_token": "eyJhbGciOi..."
  }
}
```

Para mais detalhes sobre convenções gerais de resposta, consulte a [especificação de Payloads de Resposta](../restful/http-response-payloads.md).

### Headers

| Header            | Tipo    | Valor       |
|-------------------|---------|-------------|
| `Cache-Control`   | string  | max-age=900 |
| `Link`            | string  | -           |

Exemplo:

```
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last"
```


Saiba mais sobre os headers HTTP que a Guardia utiliza [aqui](./http-headers.md).

## Comportamentos Esperados

### Paginação
- Filtros e paginação DEVEM ser combináveis.
- Se `page_token` não for informado, a API DEVE retornar a primeira página de resultados, respeitando a ordenação padrão e `page_size = 20`.
- Endpoints que retornam com paginação DEVEM garantir suporte a paginação reversa, com `previous_page_token` e `first_page_token`.
- A ordenação dos itens DEVE ser estável e determinística.

### Tokens de Página
- `page_token` DEVE expirar de forma segura ou ser validado por tempo de uso.
- O tempo de vida do page_token DEVE ser compatível com tempo de cache do header `Cache-Control` da resposta.
- As propriedades `first_page_token` e `last_page_token` DEVEM ser retornadas sempre que tecnicamente possível, mas PODEM ser omitidas para otimização de payload ou performance.
- As propriedades `previous_page_token`, `next_page_token`, `first_page_token` e `last_page_token` SÃO EXCLUSIVAS de resposta e NÃO DEVEM ser utilizadas como entrada.


### Resposta
- Se não houver resultados, a API DEVE retornar `200 OK` com lista vazia e `pagination.total_count = 0`.
- Se haver parâmetros de paginação inválidos, a API DEVE resultar em `400 Bad Request` com o código `ERR400_INVALID_PARAMETER` e o respectivo motivo de erro.
- A resposta DEVE conter corpo conforme a [especificação de response payloads da Guardia](../restful/http-response-payloads.md) tanto para sucesso quanto para erro.


## Segurança, Expiração e Conformidade
- Todos as propriedades `*_page_token` DEVEM ser tokens opacos (criptografados ou assinados), sem conter qualquer estrutura legível ou decodificável pelo cliente.
- Tokens de paginação DEVEM expirar em tempo razoável (ex: 10 minutos) para evitar uso indevido.
- Toda requisição DEVE ser registrada em log com `X-Grd-Trace-Id`.
- A implementação DEVE respeitar escopos de autorização do cliente.

## Erros Conhecidos

| Cenário                             | Código HTTP | Código                    | Motivo                |
|-------------------------------------|-------------|---------------------------|-----------------------|
| `page_token` inválido               | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_TOKEN_INVALID`  |
| `page_token` expirado               | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_TOKEN_EXPIRED`  |
| `page_size` inválido                | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_SIZE_INVALID`   |
| `page_size` acima do limite         | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_SIZE_TOO_LARGE` |
| `order_by` inválido                 | `400`       | `ERR400_INVALID_PARAMETER` | `ORDER_BY_INVALID`    |
| `sort` inválido                     | `400`       | `ERR400_INVALID_PARAMETER` | `SORT_INVALID`        |

#### Exemplo de erro (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_PARAMETER",
      "reason": "PAGE_TOKEN_INVALID",
      "message": "The page token provided has an incorrect format. Please check the token before trying again."
    }
  ]
}
```

## Quando usar
- Esta especificação DEVE ser aplicada a qualquer API REST que retorne listas de recursos.
- Mesmo quando a API retorna uma lista de recursos com apenas um item, a especificação DEVE ser aplicada.
- APIs e contratos existentes DEVEM ser adaptados de forma progressiva conforme evolução de versão ou migração.

## Notas adicionais

- A paginação DEVE ser documentada no contrato OAS da API.
- A paginação aqui descrita é considerada **padrão mínimo** para qualquer API RESTful da Guardia.

## Referências
- [GitHub - Paginação REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)

