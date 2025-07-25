---
sidebar_position: 5
---

# Ordenamiento

Esta especificación define los requisitos obligatorios para **ordenar recursos** en endpoints que devuelven listas en la plataforma Guardia, utilizando exclusivamente **propiedades temporales** como criterio de ordenamiento.

El ordenamiento se realizará a través de los parámetros `order_by` y `sort`, proporcionados en la query string de la solicitud HTTP.

## Reglas Generales

El ordenamiento DEBE:

- Estar limitado a las siguientes propiedades temporales como: `created_at`, `updated_at` o `reference_at`.
- Utilizar **índices** disponibles en la base de datos para optimizar el rendimiento y evitar escaneos completos (full scan).
- Considerar particionamiento por rango temporal, cuando sea aplicable, para ganancias de rendimiento en grandes volúmenes.
- Ser **estable**: los registros con el mismo valor en `order_by` DEBEN mantener un orden relativo consistente (ej: por `entity_id` como criterio secundario).
- Producir resultados consistentes con los parámetros recibidos y con la lógica de [paginación](./http-pagination.md) asociada.

Estas directrices reducen ambigüedades entre sistemas consumidores, promueven previsibilidad en los retornos y están alineadas con los principios de [Compliance by Design](../../community/governance/COMPLIANCE.md), especialmente en auditoría, trazabilidad y gobernanza.

### Parámetros de ordenamiento

| Parámetro  | Obligatorio | Valores permitidos                          | Predeterminado       |
|------------|-------------|----------------------------------------------|----------------------|
| `order_by` | No          | `created_at`, `updated_at`, `reference_at` | `created_at`         |
| `sort`     | No          | `asc`, `desc`                                | `asc`                |

> **NOTA:** Ambos parámetros son opcionales. En su ausencia, se aplica el ordenamiento `created_at asc`.

### Ejemplos de solicitud

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at // asume el ordenamiento predeterminado ascendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=asc // asume el ordenamiento ascendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=ASC // insensible a mayúsculas/minúsculas
```

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=desc // asume el ordenamiento descendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=DESC // insensible a mayúsculas/minúsculas
```

### Comportamientos esperados

- La ausencia de parámetros debe asumir los valores predeterminados.
- `order_by` debe aceptar solo los valores permitidos en el endpoint. Otros valores DEBEN resultar en `400 Bad Request`.
- `sort` debe aceptar solo los valores `asc` o `desc` (insensible a mayúsculas/minúsculas). Otros valores DEBEN resultar en `400 Bad Request`.

## Errores conocidos

| Escenario | Código HTTP | Code | Reason |
|-----------|-------------|------|--------|
| `order_by` inválido | `400` | `ERR400_INVALID_PARAMETER` | `ORDER_BY_INVALID` |
| `sort` inválido | `400` | `ERR400_INVALID_PARAMETER` | `SORT_INVALID` |

#### Ejemplo de error (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_PARAMETER",
      "reason": "ORDER_BY_INVALID",
      "message": "The order_by provided has an incorrect format. Please check the order_by before trying again."
    }
  ]
}
```

## Cuándo aplicar

- Esta especificación DEBE ser aplicada a **todos los endpoints paginables** que devuelvan listas ordenadas por tiempo.

**Excepciones permitidas**

- Los endpoints con ordenamiento fijo por regla de negocio PUEDEN omitir `order_by`, siempre que esté registrado en un [Registro de Decisión de Producto (PDR)](../../community/governance/index.md#registros-de-decisión-de-producto-pdr).

## Notas adicionales

- El ordenamiento DEBE estar documentado en el contrato OAS de la API.
- El ordenamiento temporal aquí descrito se considera el **estándar mínimo** para cualquier API RESTful de Guardia.
