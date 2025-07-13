---
sidebar_position: 4
---

# CloudEvents

[CloudEvents](https://cloudevents.io) es una especificación estandarizada para representar eventos — es decir, ocurrencias significativas en sistemas distribuidos — en un formato común. Esta estandarización permite la interoperabilidad entre servicios y plataformas, garantizando trazabilidad, auditabilidad y resiliencia mediante comunicación asíncrona basada en eventos.

En arquitecturas modernas, este enfoque resuelve desafíos como:
- **Interoperabilidad** entre servicios en diferentes lenguajes y plataformas
- **Trazabilidad** con metadatos esenciales para auditoría
- **Extensibilidad** para acomodar dominios variados
- **Desacoplamiento** entre productores y consumidores de eventos
- **Estandarización** según normas ampliamente adoptadas por la industria

## Estructura del Evento

La siguiente estructura presenta un resumen visual de las propiedades esperadas en un evento. Las reglas y descripciones detalladas se encuentran en la sección [Propiedades](#propiedades).

| Propiedad                               | Tipo       | Predeterminado     | Descripción                                                                           |
|-----------------------------------------|------------|--------------------|---------------------------------------------------------------------------------------|
| [`id`](#id)                             | UUID v7    | -                  | Identificador único del evento.                                                       |
| [`source`](#source)                     | URI        | -                  | Fuente del evento.                                                                    |
| [`specversion`](#specversion)           | string     | `1.0`              | Versión de la especificación CloudEvents.                                             |
| [`type`](#type)                         | string     | -                  | Tipo de evento, en el formato `event.{provider}.{module}.{entity_type}.{event_name}`. |
| [`time`](#time)                         | datetime   | -                  | Timestamp del evento.                                                                 |
| [`datacontenttype`](#datacontenttype)   | string     | `application/json` | Tipo de contenido del evento.                                                         |
| [`dataschema`](#dataschema)             | URI        | -                  | Esquema del contenido del evento.                                                     |
| [`subject`](#subject)                   | string     | -                  | Identificador de la entidad asociada al evento.                                       |
| [`idempotencykey`](#idempotencykey)     | UUID       | -                  | Clave de idempotencia del evento.                                                     |
| [`data`](#data)                         | Object     | -                  | Datos de la entidad asociada al evento.                                               |

### Propiedades

#### `id`
- DEBE ser único, inmutable y generado por el sistema.
- DEBE implementar UUID v7 según [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562) asegurando ordenamiento temporal.

#### `source`
- DEBE ser una URI canónica que apunte al endpoint de la entidad que originó el evento.
- Ejemplo: `https://<tenant_id>.guardia.finance/<module>/api/v1/<entity_type>/<entity_id>`

#### `specversion`
- DEBE ser una cadena fija con el valor `1.0`.

#### `type`
- DEBE ser una cadena en el formato `event.guardia.{entity_type}.{event_name}`.
- DEBE ser un tipo de evento catalogado en [Hub Guardia](https://hub.guardia.com/schemas).

#### `time`
- DEBE ser un timestamp en formato [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339).

#### `datacontenttype`
- DEBE ser una cadena fija con el valor `application/json`.

#### `dataschema`
- DEBE ser una URI válida que apunte al schema JSON.
- El schema JSON DEBE ser almacenado en [Hub Guardia](https://hub.guardia.com/schemas).

#### `subject`
- DEBE ser una cadena en el formato `{entity_type}/{entity_id}`.

#### `idempotencykey`
- DEBE ser un UUID válido según [RFC 9562](https://datatracker.ietf.org/doc/html/rfc9562).
- DEBE ser implementado según la especificación de [Idempotencia](../specifications/idempotency.md).

#### `data`
- DEBE ser un objeto JSON conteniendo los datos de la [entidad](../specifications/entities.md) asociada al evento.
- **Propiedades Comunes**:
  - `entity_id`: UUID de la entidad
  - `entity_type`: Tipo de la entidad
  - `external_entity_id`: ID externo de la entidad (opcional)
  - `created_at`: Timestamp de creación
  - `updated_at`: Timestamp de actualización
  - `discarded_at`: Timestamp de descarte (opcional)
  - `version`: Versión de la entidad
  - `metadata`: Objeto con metadatos adicionales
- El [histórico de la entidad](../specifications/entities.md#history) DEBE ser omitido de los eventos.

**Ejemplo de evento:**

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

### Formato y Serialización

- Los eventos DEBEN ser serializados en JSON.
- El encoding DEBE ser UTF-8.
- Los timestamps DEBEN seguir el formato [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339).
- El tamaño máximo del evento DEBE ser inferior a 64KB.

### Comportamientos Esperados

- Los eventos DEBEN ser inmutables después de la publicación.
- DEBEN ser publicados en tópicos distintos para cada tipo de evento, siguiendo el patrón de nomenclatura `event.guardia.{module}.{entity_type}.{event_name}`.
- Los sistemas consumidores DEBEN implementar idempotencia.
- Los eventos DEBEN ser consumidos asegurando el orden de entrega, manteniendo la consistencia temporal y causal entre eventos relacionados.
- Los eventos DEBEN ser auto-descriptivos, conteniendo todos los metadatos necesarios para su procesamiento y trazabilidad.
- Los sistemas DEBEN ser capaces de validar eventos contra schemas definidos, garantizando la conformidad estructural y semántica de los datos.

### Eventos externos

- Los eventos externos que no siguen el patrón Cloud Events DEBEN ser mapeados a este estándar.
- DEBEN ser publicados en tópicos distintos para cada tipo de evento, siguiendo el patrón de nomenclatura `event.{provider}.{module}.{entity_type}.{event_name}`.

## Cuándo Usar

Esta especificación DEBE ser usada cuando:

- Implementando sistemas distribuidos que necesitan intercambiar eventos
- Construyendo arquitecturas basadas en eventos
- Integrando diferentes servicios y plataformas
- Consumiendo y propagando eventos externos
- Implementando patrones de mensajería asíncrona

## Cuándo No Usar

Esta especificación NO DEBE ser usada para:

- Comunicación síncrona entre servicios
- Transferencia de archivos grandes
- Streaming de datos continuos
- Comunicación en tiempo real con baja latencia

## Consideraciones de Seguridad

- Los eventos DEBEN ser transmitidos por canales seguros (TLS)
- Los datos sensibles DEBEN ser encriptados u ofuscados.
- El acceso a los eventos DEBE ser controlado por mecanismos de autenticación y autorización basados en la especificación [Autenticación y Autorización](#)

## Notas Adicionales

- Los sistemas DEBEN implementar mecanismos de reintento para la entrega de eventos
- Los consumidores DEBEN ser idempotentes
- Los sistemas DEBEN implementar mecanismos de cola de mensajes fallidos para eventos no procesados

## Referencias

- [Cloud Events](https://cloudevents.io/)
- [Cloud Events Specification](https://github.com/cloudevents/spec)
- [RFC 3339: Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339)

