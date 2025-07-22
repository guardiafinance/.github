---
sidebar_position: 1
keywords: [guardia core banking, core bancario open source, core bancario escalable, ledger transaccional, transacciones en tiempo real]
---

# Actualización de Assets

Gestionar Assets en un sistema contable requiere equilibrio entre flexibilidad operativa e integridad histórica. Este documento define las reglas aplicables a las actualizaciones de Assets, considerando los requisitos contables (IAS/IFRS), los impactos técnicos y la trazabilidad regulatoria.

## Actualizaciones e Integridad Contable

En el contexto de Guardia, un Asset representa una unidad de valor — monetaria o no monetaria — utilizada como base en los asientos contables registrados en un Ledger. Por esta razón, algunas de sus propiedades asumen un papel estructural en la interpretación de los asientos, influyendo directamente en su validez contable y la conciliación futura. Alteraciones en estos atributos después de su uso en transacciones pueden comprometer la integridad del sistema y violar principios contables fundamentales.

Específicamente, alteraciones en la denominación de un asset — como `denomination.exponent`, `denomination.code` o `denomination.number` — no deben reflejarse retroactivamente en los Ledgers activos (aquellos que ya poseen transacciones). Al vincular un asset a un ledger, por medio de la creación de un `BoundAsset`, la denominación vigente es congelada y pasa a representar fielmente todos los asientos en aquel contexto. Cualquier alteración posterior en la denominación del asset global tendrá efecto apenas prospectivo, aplicándose solo a nuevos vínculos con ledgers creados después de la modificación. Este enfoque preserva la consistencia e integridad de los registros históricos, en conformidad con los principios de la IAS 1.15 (representación fiel).

Aunque la IAS 8 trata de la aplicación retrospectiva de cambios en políticas contables y de la corrección de errores materiales, estas directrices no se aplican a la denominación de activos en el contexto del sistema. La alteración de atributos como `denomination.exponent` o `denomination.code` o `denomination.number` no configura un cambio de política contable, tampoco una nueva estimación o error a ser corregido — se trata de una reconfiguración técnica-operacional. Además, aun si tal alteración fuese considerada política contable, su reaplicación retrospectiva sería impracticable sin comprometer la integridad de los datos históricos. La propia IAS 8.25 reconoce esta limitación: *"if it is impracticable to determine the cumulative effect […] the entity shall adjust […] to apply the new accounting policy prospectively from the earliest date practicable."* Por lo tanto, cualquier alteración debe ser aplicada de forma prospectiva, preservando los BoundAssets anteriores y asegurando conformidad con los principios de la IAS 1 e IAS 8.

Ante esto, la actualización de un asset global debe preservar la integridad contable de los ledgers que ya lo utilizan. El modelado de Guardia sigue el principio de inmutabilidad, en el cual alteraciones realizadas en un asset no impactan retroactivamente los `BoundAssets` existentes. Estas alteraciones tendrán efecto apenas prospectivo, siendo aplicables exclusivamente a nuevos vínculos con ledgers (es decir, nuevos `BoundAssets`) creados después de la actualización.

### Campos Críticos del Asset Global

Son los campos que componen la denominación del activo y tienen impacto directo en la medición contable. Por eso, su alteración requiere controles específicos:

* `denomination.code`: Código representativo (ej: "USD")
* `denomination.number`: Número ISO o identificador (ej: "840")
* `denomination.exponent`: Escala decimal (ej: 2)

> NOTA: Estos campos **pueden ser actualizados en el asset global**, siempre que los efectos se restrinjan a nuevos `BoundAssets`. Es decir, no hay impacto retroactivo en los ledgers activos (aquellos con transacciones ya registradas).

## Actualizaciones de BoundAssets

Un `BoundAsset` representa la instancia de un asset dentro de un ledger. Al ser creado, hereda, o puede sobrescribir, los atributos del asset global en el momento de la vinculación, y los congela a partir del momento que el ledger es activado, asegurando estabilidad y trazabilidad dentro del contexto contable.

### Campos Críticos del BoundAsset

* `denomination.code`
* `denomination.number`
* `denomination.exponent`

> NOTA: Estos campos solo podrán ser alterados mientras el ledger esté **inactivo**, es decir, **sin transacciones confirmadas**. Después del primer uso en una entry, los atributos del `BoundAsset` se vuelven inmutables.

**Comportamiento esperado en caso de tentativa de alteración en ledger activo**

* HTTP Status: `422 Unprocessable Entity`
* Código de error: `ERR422_BUSINESS_ERROR`
* Mensaje: `LEDGER_HAS_TRANSACTIONS`

**Ejemplo de tentativa rechazada**

```json
PUT /v1/ledgers/{ledger_identifier}/assets/{asset_identifier}
{
  "denomination": {
    "code": "BRL",
    "number": "968",
    "exponent": 4
  }
}
```

> IMPORTANTE: Para alterar los atributos de un `BoundAsset`, debe crearse un nuevo `BoundAsset` con los atributos deseados, vincular este nuevo recurso al ledger y, a continuación, descartar el vínculo anterior, si se desea. Este procedimiento está descrito en la sección [Actualizaciones de BoundAssets](#actualizaciones-de-boundassets) y garantiza la inmutabilidad de los parámetros utilizados en asientos ya realizados.

## Descarte de Assets

El descarte de un Asset global implica tornarlo indisponible para nuevos vínculos con ledgers. Esta operación no modifica ni invalida los vínculos o registros ya existentes, pero impide el uso del asset en futuras creaciones de `BoundAssets`.

### Reglas para descarte de Asset global

- **Puede ser descartado**: aun si el asset está vinculado a Ledgers existentes (con o sin transacciones).
- **Efecto del descarte**: impide la creación de nuevos `BoundAssets` a partir del asset descartado.

**Restricciones**

- El sistema debe impedir apenas nuevas vinculaciones (no el uso retroactivo).

- Ninguna modificación es hecha en los `BoundAssets` existentes.

**Ejemplo de descarte permitido**

```json
DELETE /v1/assets/{asset_identifier}
// Resultado: 204 No Content
// Efecto: asset es marcado como descartado; vínculos existentes permanecen válidos
```

## Descarte de BoundAssets

El descarte de un `BoundAsset` representa la desactivación de un vínculo específico entre un asset y un ledger. Después de descartado, el `BoundAsset` no podrá más ser utilizado para creación de books o registros contables.

### Reglas para descarte de BoundAsset

- **Puede ser descartado físicamente**: si, y solo si, el `BoundAsset` **no ha sido utilizado** en ningún `Book`.
- **Puede ser descartado lógicamente**: cuando el `BoundAsset` **ha sido utilizado** en un `Book`.
  - **Efecto del descarte**: impide la creación de nuevos `Books` a partir del `BoundAsset` descartado.

**Ejemplo de descarte permitido**

```json
DELETE /v1/ledgers/{ledger_identifier}/assets/{asset_identifier}
// Resultado: 204 No Content
// Efecto: BoundAsset es marcado como descartado; vínculos existentes permanecen válidos
```

## Referencias

- [IAS 1 – Presentación de Estados Financieros](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8 – Políticas Contables, Cambios en Estimaciones Contables y Errores](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
