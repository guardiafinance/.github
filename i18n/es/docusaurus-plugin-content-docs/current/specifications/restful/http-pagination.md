---
sidebar_position: 4
---

# Paginación

Esta especificación define un estándar unificado de **paginación** para todos los endpoints de APIs RESTful de Guardia que devuelven listas de recursos. El objetivo es garantizar la consistencia entre interfaces, la previsibilidad en el consumo de datos y la interoperabilidad entre sistemas internos y externos.

La estandarización de la paginación **previene sobrecargas sistémicas**, mejora el tiempo de respuesta y reduce el uso de recursos computacionales. Está alineada con los principios de [Compliance by Design](../../community/governance/COMPLIANCE.md), como:

  - *Eficiencia*: a través de mecanismos de paginación eficientes, con minimización de datos, evitando retornos excesivos.
  - *Transparencia y auditabilidad*: proporcionando respuestas estructuradas y rastreables.
  - *Previsibilidad*: permitiendo que los consumidores predigan el comportamiento y el resultado de las operaciones de paginación.

Apoya **integración eficiente** con herramientas externas y promueve la reutilización de componentes internos.

## Solicitud

Los sistemas de Guardia DEBEN ofrecer los siguientes mecanismos de paginación:

| Parámetro                       | Tipo    | Predeterminado | Máximo |
|---------------------------------|---------|----------------|--------|
| [`page_size`](#page_size)       | uint32  | 20             | 100    |
| [`page_token`](#page_token)     | string  | -              | -      |
| [`order_by`](#order_by)         | string  | created_at     | -      |
| [`sort`](#sort)                 | string  | asc            | -      |

### Parámetros de Paginación

Los sistemas que exponen recursos paginables DEBEN implementar los siguientes parámetros de control de paginación. Estos parámetros DEBEN ser aceptados vía query string en endpoints compatibles con paginación.

#### `page_size`
- DEBE ser un número entero que represente la cantidad de elementos por página.
- CUANDO no se especifique, DEBE asumir el valor predeterminado de `20`.
- NO DEBE exceder el valor máximo de `100`.
- Las solicitudes con valores por encima del límite DEBEN ser rechazadas con error de validación.

#### `page_token`
- DEBE ser un token opaco que represente la posición actual de la paginación.
- DEBE ser retornado por el sistema en llamadas anteriores, cuando sea aplicable.
- El formato y semántica del token son responsabilidad del sistema y DEBEN ser tratados como opacos por el cliente.

#### `order_by`
- DEBE ser una cadena que indique la propiedad base para la ordenación de resultados.
- CUANDO no se informe, DEBE asumir el valor predeterminado `created_at`.
- VALORES permitidos incluyen `created_at`, `updated_at` y `reference_at`.
- CUALQUIER otro valor informado DEBE ser rechazado con error de validación.

#### `sort`
- DEBE ser una cadena que indique la dirección de la ordenación.
- VALORES permitidos son `asc` (orden ascendente) y `desc` (orden descendente).
- CUANDO no se informe, DEBE asumir `desc`.

## Respuesta

La respuesta DEBE contener los siguientes propiedades:

| Propiedad                                                             | Tipo   |
|-----------------------------------------------------------------------|--------|
| [`data`](#data)                                                       | array  |
| [`pagination`](#pagination)                                           | object |
| [`pagination.page_size`](#paginationpage_size)                       | uint32 |
| [`pagination.total_count`](#paginationtotal_count)                   | uint32 |
| [`pagination.first_page_token`](#paginationfirst_page_token)         | string |
| [`pagination.previous_page_token`](#paginationprevious_page_token)   | string |
| [`pagination.next_page_token`](#paginationnext_page_token)           | string |
| [`pagination.last_page_token`](#paginationlast_page_token)           | string |

### Estructura del Payload

Las respuestas de endpoints que implementan paginación DEBEN seguir la estructura a continuación. El objeto `pagination` DEBE contener los metadatos necesarios para la navegación entre páginas de forma segura, eficiente e independiente del estado en el servidor.

#### `data`
- DEBE ser un array que contenga los elementos de la página actual.
- CADA elemento DEBE seguir la estructura de recurso definida para el endpoint consultado.

#### `pagination`
- DEBE ser un objeto que contenga los metadatos de paginación.
- Todos las propiedades de `pagination` DEBEN estar presentes, incluso si son nulos cuando no son aplicables.

##### `pagination.page_size`
- DEBE ser un entero positivo (`uint32`) que represente el número de elementos por página en la respuesta.

##### `pagination.total_count`
- DEBE ser un entero positivo (`uint32`) que represente el número total de registros disponibles en la consulta original.
- PUEDE ser omitido en escenarios de paginación altamente escalables donde el conteo completo afecte el rendimiento.

##### `pagination.first_page_token`
- PUEDE ser una cadena que represente el token de la primera página.
- DEBE ser tratado como un recurso auxiliar para clientes que deseen reiniciar la navegación.

##### `pagination.previous_page_token`
- PUEDE ser una cadena que represente el token de la página anterior.
- CUANDO esté ausente o sea nulo, indica que esta es la primera página de la secuencia.

##### `pagination.next_page_token`
- PUEDE ser una cadena que represente el token de la siguiente página.
- CUANDO esté ausente o sea nulo, indica que no hay más páginas siguientes.

##### `pagination.last_page_token`
- PUEDE ser una cadena que represente el token de la última página.
- DEBE ser utilizado opcionalmente por los clientes para saltar al final de la secuencia.

#### Ejemplo en JSON
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
    "last_page_token": "eyJhbGciOi...",
  }
}
```

Para más detalles sobre las convenciones generales de respuesta, consulte la [especificación de Payloads de Respuesta](../restful/http-response-payloads.md).

### Headers

| Header            | Tipo    | Valor       |
|-------------------|---------|-------------|
| `Cache-Control`   | string  | max-age=900 |
| `Link`            | string  | -           |

Ejemplo:

```
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last"
```

Conozca más sobre los headers HTTP que utiliza Guardia [aquí](./http-headers.md).

## Comportamientos Esperados

### Paginación
- Los filtros y la paginación DEBEN ser combinables.
- Si no se proporciona `page_token`, la API DEBE devolver la primera página de resultados, respetando el orden predeterminado y `page_size = 20`.
- Los endpoints que devuelven con paginación DEBEN garantizar soporte para paginación inversa, con `previous_page_token` y `first_page_token`.
- El orden de los elementos DEBE ser estable y determinista.

### Tokens de Página
- `page_token` DEBE expirar de forma segura o ser validado por tiempo de uso.
- El tiempo de vida del page_token DEBEN ser compatible con el tiempo de caché del header `Cache-Control` de la respuesta.
- Las propiedades `first_page_token` y `last_page_token` DEBEN ser devueltos siempre que sea técnicamente posible, pero PUEDEN ser omitidos para optimización de payload o rendimiento.
- Las propiedades como `previous_page_token`, `next_page_token`, `first_page_token` y `last_page_token` son EXCLUSIVAS de la respuesta y NO DEBEN ser utilizadas como entrada.

### Respuesta
- Si no hay resultados, la API DEBE devolver `200 OK` con lista vacía y `pagination.total_count = 0`.
- Si hay parámetros de paginación inválidos, la API DEBE resultar en `400 Bad Request` con el código `ERR400_INVALID_PARAMETER` y el respectivo motivo de error.
- La respuesta DEBE contener un cuerpo según la [especificación de response payloads de Guardia](../restful/http-response-payloads.md) tanto para éxito como para error.

## Seguridad, Expiración y Cumplimiento
- Todos las propiedades `*_page_token` DEBEN ser tokens opacos (encriptados o firmados), sin contener ninguna estructura legible o decodificable por el cliente.
- Los tokens de paginación DEBEN expirar en un tiempo razonable (ej: 10 minutos) para evitar uso indebido.
- Toda solicitud DEBE ser registrada en log con `X-Grd-Trace-Id`.
- La implementación DEBE respetar los alcances de autorización del cliente.

## Errores Conocidos

| Escenario                           | Código HTTP | Código                     | Motivo                |
|-------------------------------------|-------------|----------------------------|-----------------------|
| `page_token` inválido               | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_TOKEN_INVALID`  |
| `page_token` expirado               | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_TOKEN_EXPIRED`  |
| `page_size` inválido                | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_SIZE_INVALID`   |
| `page_size` por encima del límite   | `400`       | `ERR400_INVALID_PARAMETER` | `PAGE_SIZE_TOO_LARGE` |
| `order_by` inválido                 | `400`       | `ERR400_INVALID_PARAMETER` | `ORDER_BY_INVALID`    |
| `sort` inválido                     | `400`       | `ERR400_INVALID_PARAMETER` | `SORT_INVALID`        |

#### Ejemplo de Error (JSON)
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

## Cuándo Usar
- Esta especificación DEBE ser aplicada a cualquier API REST que devuelva listas de recursos.
- Incluso cuando la API devuelve una lista de recursos con un solo elemento, la especificación DEBE ser aplicada.
- Las APIs y contratos existentes DEBEN ser adaptados progresivamente según la evolución de versión o migración.

## Notas Adicionales

- La paginación DEBE ser documentada en el contrato OAS de la API.
- La paginación aquí descrita es considerada el **estándar mínimo** para cualquier API RESTful de Guardia.

## Referencias
- [GitHub - Paginación REST API](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)
