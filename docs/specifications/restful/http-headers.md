---
sidebar_position: 3
---

# Headers

Esta especificação descreve os headers padrão e customizados adotados pela Guardia em suas APIs RESTful.

Seu objetivo é promover consistência entre interfaces, garantir previsibilidade no consumo de dados e facilitar a interoperabilidade entre módulos internos, serviços externos e integrações de parceiros.

A padronização dos headers contribui para:
- Rastreabilidade eficiente de requisições.
- Depuração segura em ambientes controlados.
- Escalabilidade das integrações.
- Conformidade com padrões de segurança.
- Melhor experiência de desenvolvimento.

Todos os headers DEVEM seguir o padrão de nomenclatura definido nesta especificação.

## Headers Padrões


| Header                                            | Tipo     | Categoria | Direção   | Obrigatoriedade | Descrição                         |
|---------------------------------------------------|----------|-----------|-----------|-----------------|-----------------------------------|
| [Cache-Control](#cache-control)                   | string   | padrão    | Response  | Opcional        | Diretivas para controle de cache. |
| [Link](#link)                                     | string   | padrão    | Response  | Opcional        | Links de navegação.               |

---

### Cache-Control

O campo de cabeçalho `Cache-Control` DEVE ser usado para orientar mecanismos de cache tanto em requisições quanto em respostas.

#### Resposta

O cache DEVE ser configurado com a diretiva `max-age=<seconds>`, precedida por:

- `public`, quando o cache pode ser compartilhado entre múltiplos usuários;

```http
Cache-Control: public, max-age=<seconds>
```

- `private`, quando o cache é exclusivo do usuário final.

```http
Cache-Control: private, max-age=<seconds>
```

Para respostas que NÃO DEVEM ser armazenadas em cache, o cabeçalho abaixo DEVE ser usado:

```http
Cache-Control: no-store
```

Outras diretivas podem ser adicionadas conforme a necessidade, seguindo a [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111#section-5.2).

---

### Link

O cabeçalho `Link` PODE ser usado para fornecer links referente a paginação de resultados ou estado de uma entidade, indicado pelo parametro `rel`, seguindo as diretivas de [HATEOAS](https://restfulapi.net/hateoas) da especificação RESTful.

Exemplo em caso de paginação:

```http
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first"
```

Exemplo em caso de estado de uma entidade:

```http
Link: <https://{tenant_id}.guardia.finance/api/v1/ledgers/{entity_id}>; rel="ledger"
```

---

## Headers Customizados

Os headers customizados utilizados pela Guardia seguem o prefixo `X-Grd-*`, conforme convenção. Eles atendem a necessidades específicas de rastreabilidade e correlação entre sistemas.

| Header                                            | Tipo     | Categoria | Direção   | Obrigatoriedade | Descrição                                             |
|---------------------------------------------------|----------|-----------|-----------|-----------------|-------------------------------------------------------|
| [X-Grd-Debug](#x-grd-debug)                       | booleano | custom    | Request   | Opcional        | Flag para habilitar modo debug.                       |
| [X-Grd-Trace-Id](#x-grd-trace-id)                 | uuid     | custom    | Response  | Obrigatório     | ID de rastreamento da requisição.                     |
| [X-Grd-Correlation-Id](#x-grd-correlation-id)     | uuid     | custom    | Ambos     | Opcional        | ID de correlação para chamadas externas distribuídas. |

---

### X-Grd-Debug

Header booleano opcional. Quando presente com o valor `true`, a resposta DEVE incluir o campo `debug` no payload, contendo informações adicionais conforme [especificação de payloads de resposta](./http-response-payloads.md#em-caso-de-debug).

```http
X-Grd-Debug: true
```

#### Validação
- DEVE aceitar apenas os valores `true` ou `false` (case insensitive).
- Qualquer outro valor DEVE resultar em `400 Bad Request` com o reason `INVALID_HEADER_VALUE`.
- O uso em ambientes de produção DEVE ser controlado por:
  - Escopo de permissão específico.
  - Tempo maximo de uso restrito a 10 minutos por cliente,
  - Limite de 10 requisições por minuto.
  - Intervalo de uso restrito a pelo menos 1 minuto entre uma requisição e outra.
  - Logging de auditoria de uso.

---

### X-Grd-Trace-Id

Header obrigatório retornado em **todas as respostas** das APIs da Guardia. Representa o identificador único da requisição.

- DEVE ser gerado pela infraestrutura da Guardia.
- DEVE rastrear a requisição e a resposta ao longo de todas as camadas do sistema, incluindo eventos de dominio e notificações por webhooks.
- O valor DEVE seguir o padrão UUIDv7, com marcação temporal conforme especificado na [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7).

```http
X-Grd-Trace-Id: <uuid>
```

#### Validação
- DEVE ser um UUIDv7 válido.
- DEVE ser incluído em todas as respostas, incluindo erros.

---

### X-Grd-Correlation-Id

Header opcional enviado por sistemas externos. Utilizado para propagar contexto de rastreamento ao longo de chamadas distribuídas.

- Se presente na requisição, DEVE ser incluído na resposta.
- Se presente na requisição, DEVE ser propagado por todas as camadas do sistema, incluindo eventos de dominio e notificações por webhooks.
- O valor DEVE seguir o padrão UUID proposto pela [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).

```http
X-Grd-Correlation-Id: <uuid>
```

#### Validação
- Se presente, DEVE ser um UUID válido.
- Se inválido, DEVE ser ignorado e um novo valor DEVE ser gerado.

---

## Considerações de Segurança

- Headers de rastreamento NÃO DEVEM conter:
  - Dados sensíveis.
  - Informações PII (Personally Identifiable Information).
  - Segredos ou credenciais.
  - Informações de negócio confidenciais.
- Requisições DEVEM ser validadas:
  - Independentemente do status de autenticação
  - Considerando o contexto de segurança do tenant
  - Respeitando os limites de taxa configurados
- Headers customizados DEVEM:
  - Ser validados quanto ao tamanho máximo.
  - Ser sanitizados para prevenir injeção de código.
  - Ser limitados em quantidade por requisição.

## Notas adicionais

- Os headers utilizados em cada endpoint DEVEM ser documentados no contrato OAS da API.
- Os headers aqui descritos são considerados **padrão mínimo** para qualquer API RESTful da Guardia.

## Referências

- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)
- [Cabeçalhos HTTP - HTTP | MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [HATEOAS](https://restfulapi.net/hateoas)
