---
sidebar_position: 4
---

# CloudEvents

[CloudEvents](https://cloudevents.io) é uma especificação padronizada para representar eventos — ou seja, ocorrências significativas em sistemas distribuídos — em um formato comum. Essa padronização permite interoperabilidade entre serviços e plataformas, garantindo rastreabilidade, auditabilidade e resiliência por meio de comunicação assíncrona baseada em eventos.

Em arquiteturas modernas, essa abordagem resolve desafios como:
- **Interoperabilidade** entre serviços em diferentes linguagens e plataformas
- **Rastreabilidade** com metadados essenciais para auditoria
- **Extensibilidade** para acomodar domínios variados
- **Desacoplamento** entre produtores e consumidores de eventos
- **Padronização** conforme normas amplamente adotadas pela indústria

## Estrutura do Evento

| Propriedade                               | Tipo       | Padrão            | Descrição                                                                          |
|-------------------------------------------|------------|-------------------|------------------------------------------------------------------------------------|
| [`id`](#id)                               | UUID v7    | -                 | Identificador único do evento.                                                     |
| [`source`](#source)                       | URI        | -                 | Origem do evento.                                                                  |
| [`specversion`](#specversion)             | string     | `1.0`             | Versão da especificação CloudEvents.                                               |
| [`type`](#type)                           | string     | -                 | Tipo do evento.                                                                    |
| [`time`](#time)                           | datetime   | -                 | Timestamp da ocorrência do evento.                                                 |
| [`datacontenttype`](#datacontenttype)     | string     | `application/json`| Tipo do conteúdo do evento.                                                        |
| [`dataschema`](#dataschema)               | URI        | -                 | Schema do conteúdo do evento.                                                      |
| [`subject`](#subject)                     | string     | -                 | Identificador da entidade associada ao evento.                                     |
| [`idempotencykey`](#idempotencykey)       | UUID       | -                 | Chave de idempotência do evento.                                                   |
| [`data`](#data)                           | Object     | -                 | Dados da entidade associada ao evento.                                             |

### Propriedades

#### `id`
- DEVE ser único, imutável e gerado pelo sistema.
- DEVE implementar o UUID v7 conforme a [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562) assegurando ordenação temporal.

#### `source`
- DEVE ser uma URI canônica apontando para o endpoint da entidade que originou o evento.
- Exemplo: `https://<tenant_id>.guardia.finance/<module>/api/v1/<entity_type>/<entity_id>`

#### `specversion`
- DEVE ser uma string fixa com o valor `1.0`.

#### `type`
- DEVE ser uma string no formato `event.{provider}.{module}.{entity_type}.{event_name}`.
- DEVE ser um tipo de evento catalogado no [Hub Guardia](https://hub.guardia.com/schemas).

#### `time`
- DEVE ser um timestamp no formato [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339).

#### `datacontenttype`
- DEVE ser uma string fixa com o valor `application/json`.

#### `dataschema`
- DEVE ser uma URI válida apontando para o schema JSON.
- O schema JSON DEVE ser armazenado no [Hub Guardia](https://hub.guardia.com/schemas).

#### `subject`
- DEVE ser uma string no formato `{entity_type}/{entity_id}`.

#### `idempotencykey`
- DEVE ser um UUID válido conforme a [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- DEVE ser implementado conforme a especificação de [Idempotência](../specifications/idempotency.md).

#### `data`
- DEVE ser um JSON object contendo os dados da [entidade](../specifications/entities.md) associada ao evento.
- **Propriedades Comuns**:
  - `entity_id`: UUID da entidade.
  - `entity_type`: Tipo da entidade.
  - `external_entity_id`: ID externo da entidade (opcional).
  - `created_at`: Timestamp de criação.
  - `updated_at`: Timestamp de atualização.
  - `discarded_at`: Timestamp de descarte (opcional).
  - `version`: Versão da entidade.
  - `metadata`: Objeto com metadados adicionais.
- O [histórico da entidade](../specifications/entities.md#history) DEVE ser omitido dos eventos.

**Exemplo de evento:**

```json
{
  "specversion" : "1.0",
  "type" : "event.guardia.lke.ledger.created",
  "datacontenttype" : "application/json",
  "source" : "https://my_tenant.guardia.finance/lke/api/v1/ledgers/019634679e5a708f8205e54411ba3200",
  "subject" : "ledger/019634679e5a708f8205e54411ba3200",
  "id" : "019634679e5a79778db11fb1f031fb3a",
  "time" : "2018-04-05T17:31:00Z",
  "idempotencykey": "94f6ef1d-8b1a-4f70-9210-dfe2f84026f7",
  "data" : {
    "entity_id": "019634679e5a708f8205e54411ba3200",
    "entity_type": "LEDGER",
    "external_entity_id": "9606e83f427b44c298192c0f110129bc",
    "name": "General Ledger",
    "description": "Ledger da ACME Corp.",
    "created_at": "2024-11-17T00:00:00.000Z",
    "updated_at": "2024-11-17T00:00:00.000Z",
    "discarded_at": "2024-11-17T00:00:00.000Z",
    "version" : 1,
    "metadata": {
      "foo": "bar"
    }
  }
}
```

### Formato e Serialização

- Os eventos DEVEM ser serializados em JSON.
- O encoding DEVE ser UTF-8.
- Os timestamps DEVEM seguir o formato [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339).
- O tamanho máximo do evento DEVE ser de inferiores a 12KB.

### Comportamentos Esperados

- Eventos DEVEM ser imutáveis após a publicação.
- DEVEM ser publicados em tópicos distintos para cada tipo de evento, seguindo o padrão de nomenclatura `event.guardia.{module}.{entity_type}.{event_name}`.
- Sistemas consumidores DEVEM implementar idempotência.
- Os eventos DEVEM ser consumidos assegurando a ordem de entrega, mantendo a consistência temporal e causal entre eventos relacionados.
- Os eventos DEVEM ser auto-descritivos, contendo todos os metadados necessários para seu processamento e rastreabilidade.
- Os sistemas DEVEM ser capazes de validar eventos contra schemas definidos, garantindo a conformidade estrutural e semântica dos dados.

### Eventos externos

- Eventos externos que nao seguem o padrao Cloud Events DEVEM ser mapeados para este padrão.
- DEVEM ser publicados em tópicos distintos para cada tipo de evento, seguindo o padrão de nomenclatura `event.{provider}.{module}.{entity_type}.{event_name}`.

## Quando Usar

Esta especificação DEVE ser usada quando:

- Implementando sistemas distribuídos que precisam trocar eventos.
- Construindo arquiteturas baseadas em eventos.
- Integrando diferentes serviços e plataformas.
- Consumindo e propagando eventos externos.
- Implementando padrões de mensageria assíncrona.

## Quando Não Usar

Esta especificação NÃO DEVE ser usada para:

- Comunicação síncrona entre serviços.
- Transferência de arquivos grandes.
- Streaming de dados contínuos.
- Comunicação em tempo real com baixa latência.

## Considerações de Segurança

- Os eventos DEVEM ser transmitidos por canais seguros (TLS).
- Os dados sensíveis DEVEM ser criptografados ou ofuscados.
- O acesso aos eventos DEVEM ser controlado por mecanismos de autenticação e autorização com base na especificação [Autenticação e Autorização](#).

## Notas Adicionais

- Os sistemas DEVEM implementar mecanismos de retry para entrega de eventos.
- Os consumidores DEVEM ser idempotentes.
- Os sistemas DEVEM implementar mecanismos de dead letter queue para eventos não processados.

## Referências

- [Cloud Events](https://cloudevents.io/)
- [Cloud Events Specification](https://github.com/cloudevents/spec)
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)

