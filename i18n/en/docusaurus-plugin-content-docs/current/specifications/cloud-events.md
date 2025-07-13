---
sidebar_position: 4
---

# CloudEvents

[CloudEvents](https://cloudevents.io) is a standardized specification for representing events — that is, significant occurrences in distributed systems — in a common format. This standardization enables interoperability between services and platforms, ensuring traceability, auditability, and resilience through event-based asynchronous communication.

In modern architectures, this approach addresses challenges such as:
- **Interoperability** between services in different languages and platforms
- **Traceability** with essential metadata for auditing
- **Extensibility** to accommodate varied domains
- **Decoupling** between event producers and consumers
- **Standardization** according to widely adopted industry norms

## Event Structure

The following structure presents a visual summary of the expected properties in an event. Detailed rules and descriptions can be found in the [Properties](#properties) section.

| Property                               | Type       | Default            | Description                                                                          |
|---------------------------------------|------------|---------------------|--------------------------------------------------------------------------------------|
| [`id`](#id)                           | UUID v7    | -                   | Unique identifier for the event.                                                     |
| [`source`](#source)                   | URI        | -                   | Event source.                                                                        |
| [`specversion`](#specversion)         | string     | `1.0`               | CloudEvents specification version.                                                   |
| [`type`](#type)                       | string     | -                   | Event type, in the format `event.{provider}.{module}.{entity_type}.{event_name}`.    |
| [`time`](#time)                       | datetime   | -                   | Event timestamp.                                                                     |
| [`datacontenttype`](#datacontenttype) | string     | `application/json`  | Event content type.                                                                  |
| [`dataschema`](#dataschema)           | URI        | -                   | Event content schema.                                                                |
| [`subject`](#subject)                 | string     | -                   | Entity identifier associated with the event.                                         |
| [`idempotencykey`](#idempotencykey)   | UUID       | -                   | Event idempotency key.                                                               |
| [`data`](#data)                       | Object     | -                   | Entity data related that produce the event.                                          |

### Properties

#### `id`
- MUST be unique, immutable, and system-generated.
- MUST implement UUID v7 according to [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562) ensuring temporal ordering.

#### `source`
- MUST be a canonical URI pointing to the endpoint of the entity that originated the event.
- Example: `https://<tenant_id>.guardia.finance/<module>/api/v1/<entity_type>/<entity_id>`

#### `specversion`
- MUST be a fixed string with the value `1.0`.

#### `type`
- MUST be a string in the format `event.guardia.{entity_type}.{event_name}`.
- MUST be a type of event cataloged in [Guardia Hub](https://hub.guardia.com/schemas).

#### `time`
- MUST be a timestamp in [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) format.

#### `datacontenttype`
- MUST be a fixed string with the value `application/json`.

#### `dataschema`
- MUST be a valid URI pointing to the JSON schema.
- The JSON schema MUST be stored in [Guardia Hub](https://hub.guardia.com/schemas).

#### `subject`
- MUST be a string in the format `{entity_type}/{entity_id}`.

#### `idempotencykey`
- MUST be a valid UUID according to [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- MUST be implemented according to the [Idempotency](../specifications/idempotency.md) specification.

#### `data`
- MUST be a JSON object containing the data of the [entity](../specifications/entities.md) associated with the event.
- **Common Properties**:
  - `entity_id`: Entity UUID
  - `entity_type`: Entity type
  - `external_entity_id`: External entity ID (optional)
  - `created_at`: Creation timestamp
  - `updated_at`: Update timestamp
  - `discarded_at`: Discard timestamp (optional)
  - `version`: Entity version
  - `metadata`: Object with additional metadata
- The [entity history](../specifications/entities.md#history) MUST be omitted from events.

**Event Example:**

```json
{
  "specversion" : "1.0",
  "type" : "event.guardia.ledger.created",
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

### Format and Serialization

- Events MUST be serialized in JSON.
- Encoding MUST be UTF-8.
- Timestamps MUST follow [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339) format.
- Maximum event size MUST be less than 64KB.

### Expected Behaviors

- Events MUST be immutable after publication.
- MUST be published in distinct topics for each event type, following the naming pattern `event.guardia.{module}.{entity_type}.{event_name}`.
- Consumer systems MUST implement idempotency.
- Events MUST be consumed ensuring delivery order, maintaining temporal and causal consistency between related events.
- Events MUST be self-descriptive, containing all metadata necessary for processing and traceability.
- Systems MUST be able to validate events against defined schemas, ensuring structural and semantic data compliance.

### External Events

- External events that do not follow the Cloud Events pattern MUST be mapped to this standard.
- MUST be published in distinct topics for each event type, following the naming pattern `event.{provider}.{module}.{entity_type}.{event_name}`.

## When to Use

This specification MUST be used when:

- Implementing distributed systems that need to exchange events
- Building event-based architectures
- Integrating different services and platforms
- Consuming and propagating external events
- Implementing asynchronous messaging patterns

## When Not to Use

This specification MUST NOT be used for:

- Synchronous communication between services
- Large file transfers
- Continuous data streaming
- Real-time communication with low latency

## Security Considerations

- Events MUST be transmitted over secure channels (TLS)
- Sensitive data MUST be encrypted or obfuscated.
- Event access MUST be controlled by authentication and authorization mechanisms based on the [Authentication and Authorization](#) specification.

## Additional Notes

- Systems MUST implement retry mechanisms for event delivery
- Consumers MUST be idempotent
- Systems MUST implement dead letter queue mechanisms for unprocessed events

## References

- [Cloud Events](https://cloudevents.io/)
- [Cloud Events Specification](https://github.com/cloudevents/spec)
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)

