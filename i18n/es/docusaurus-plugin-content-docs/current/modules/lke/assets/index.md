---
sidebar_position: 0
keywords: [guardia core bancario, libro mayor transaccional, libro mayor como servicio, módulo de libro mayor de guardia, activos, ias-1, ias-8]
---

# Activos (Assets)

Los activos representan las unidades monetarias o no monetarias utilizadas en los asientos contables dentro de un Ledger y pueden clasificarse en dos tipos principales:

- **Activos Fiat**: Representaciones digitales de monedas fiduciarias, como BRL, USD o EUR, entre otras.
- **Activos No-Fiat**: Representaciones digitales de criptomonedas (como BTC, ETH, XRP) o de activos tokenizados, como commodities, acciones u otros instrumentos financieros.

## Propiedades del Activo

Cada activo posee las siguientes propiedades:

| Campo       | Descripción |
|-------------|-----------|
| `code`      | Identificador alfanumérico del activo, que puede basarse en códigos ISO 4217 para monedas fiduciarias (ej: USD para dólar, BRL para real) o puede ser un código arbitrario (ej: GRD1 para la versión 1 del Guardia Token). |
| `number`    | Identificador numérico del activo, generalmente basado en el estándar ISO 4217 para monedas fiduciarias (ej: "840" para USD). |
| `exponent`  | Define el número de decimales utilizados para representar la fracción más pequeña del activo (ej: 2 para centavos en USD — es decir, 1 USD = 100 cents). |
| `is_fiat`   | Define si el activo es una moneda fiduciaria (`true`) o no (`false`). |
| `locations` | Lista de países donde el activo es aceptado. |
| `ledgers`   | Lista de ledgers en los que el activo está declarado. |
| `metadata`  | Información adicional sobre el activo, que puede incluir descripción, etiquetas, entre otros datos externos. |

Para más detalles sobre las propiedades del activo, consulte la sección [Modelo de Dominio](../models/index.md#asset).

## Relación Asset/Ledger

Los activos son declarados y versionados en el contexto de uno o más **Ledgers** específicos. Este enfoque garantiza que cada Ledger mantenga una visión consistente y auditada de su universo contable.

Las propiedades `code`, `number` y `exponent` se definen **por activo, por ledger**. Esto significa que el mismo activo (como "USD") puede ser declarado de forma independiente en diferentes ledgers, con configuraciones específicas. Sin embargo, se recomienda encarecidamente mantener la consistencia entre los entornos para evitar conflictos operativos.
