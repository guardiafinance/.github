---
sidebar_position: 0
keywords: [guardia core bancario, libro mayor transaccional, libro mayor como servicio, módulo de libro mayor de guardia, activos, ias-1, ias-8]
---

# Activos (Assets)

Los activos representan unidades de valor — monetarias o no monetarias — utilizadas en los asientos contables dentro de un Ledger. Pueden clasificarse, para fines operacionales, en dos tipos principales:

- **Fiduciarios (Fiat)**: Representaciones digitales de unidades monetarias fiduciarias, denominadas en monedas como Real Brasileño (BRL), Dólar Americano (USD) o Euro (EUR), entre otras con código ISO 4217. Use Fiat para representar cualquier activo regido por contrato financiero o denominado en moneda fiduciaria;

- **No-Fiduciarios (Non-Fiat)**: Representaciones digitales de criptomonedas (como Bitcoin (BTC), Ethereum (ETH), Ripple (XRP)) o de activos tokenizados no financieros, como inmuebles, créditos de carbono u otros bienes físicos no sujetos a liquidación financiera contractual. Use Non-Fiat para activos sin contrato financiero directo — como criptomonedas puras, inmuebles físicos y activos tokenizados sin liquidación financiera.

## Clasificación de Activos: Fiat vs. Non-Fiat (Guía Práctica)

| Tipo de Activo                                  | Ejemplo                         | Clasificación IFRS              | Clasificación Fiduciaria | Descripción Didáctica                                             |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| Dinero en efectivo o digital estatal           | BRL, USD, EUR                   | Activo Financiero               | **Fiat**                 | Representa dinero físico o digital oficial de un gobierno        |
| Instrumento patrimonial                         | Acciones ordinarias, preferentes| Activo Financiero               | **Fiat**                 | Representa participación en el capital de otra entidad           |
| Instrumento de deuda                            | Debentures, bonos, CDB          | Activo Financiero               | **Fiat**                 | Título que da derecho a recibir dinero en el futuro              |
| Commodity tokenizada con liquidación en dinero | Token de oro en USD             | Activo Financiero (Derivativo)  | **Fiat**                 | Contrato que resulta en pago financiero                          |
| Criptomonedas puras                             | BTC, ETH, XRP                   | **No Financiero** (generalmente)| **Non-Fiat**             | Activos digitales descentralizados, sin derecho contractual de efectivo |
| Bien físico                                     | Inmueble, terreno               | Activo No Financiero            | **Non-Fiat**             | Activo tangible no vinculado directamente a contrato financiero  |
| Token de inmueble                               | Token representando inmueble    | Depende del contrato            | **Non-Fiat**             | Puede convertirse en "Fiat" si hay liquidación en dinero         |
| Commodity física                                | Oro, petróleo, café             | Activo No Financiero            | **Non-Fiat**             | Bien negociable físicamente, sin contrato financiero por sí solo |
| Crédito de carbono                              | Certificado de emisión          | Activo No Financiero            | **Non-Fiat**             | Unidad de valor ambiental, sin contrato de liquidación financiera|

## Denominación del Activo

Cada activo posee una denominación, que es un objeto con las siguientes propiedades:

| Campo       | Descripción |
|-------------|-----------|
| `code`      | Identificador alfanumérico del activo, que puede basarse en códigos ISO 4217 para monedas fiduciarias (ej: USD para dólar, BRL para real) o puede ser un código arbitrario (ej: GRD1 para la versión 1 del Guardia Token). |
| `number`    | Identificador numérico del activo, generalmente basado en el estándar ISO 4217 para monedas fiduciarias (ej: "840" para USD). |
| `exponent`  | Define el número de casas decimales utilizadas para representar la menor fracción del activo (ej: 2 para centavos en USD — es decir, 1 USD = 100 cents). |
| `locations` | Lista de países en que el activo es aceptado. |

Para más detalles sobre las propiedades del activo, consulte la sección [Modelo de Dominio](../models/index.md#asset).

## Relaciones y Efectos Normativos

### Relación Asset/Ledger (BoundAsset)

Los activos son declarados y versionados en el contexto de uno o más **Ledgers** por medio de la entidad intermediaria **`BoundAsset`**. Este modelado garantiza que cada `Ledger` mantenga una configuración aislada, trazable y auditable de los activos utilizados en sus asientos contables.

La **denominación** de un asset — compuesta por propiedades como `code`, `number` y `exponent` — define cómo ese activo es identificado, convertido y presentado operacionalmente. Esta denominación es inicialmente establecida en el ámbito del `Asset`, representando su forma **global y genérica** en el sistema.

Sin embargo, al vincular un `Asset` a un `Ledger` por medio de un `BoundAsset`, es posible **sobrescribir la denominación original** con configuraciones específicas para aquel contexto contable. Esta capacidad de especialización permite adaptar la representación del activo a las **exigencias operacionales, regulatorias o técnicas** de cada ledger.

Por ejemplo, el asset global "USD" puede tener como denominación por defecto `exponent = 2`, pero ser configurado con `exponent = 0` en un ledger que opera exclusivamente con valores enteros por restricciones sistémicas.

> NOTA: Este modelado garantiza **precisión contable en el contexto local** (por ledger), sin comprometer la identidad ni la trazabilidad del asset global. Además, asegura conformidad con el principio de **representación fiel**, conforme a la **IAS 1**.

### Relación BoundAsset/Book

Un `Book` representa la instancia de uso de un `BoundAsset` por un cliente o entidad dentro de un `Ledger`. Este vínculo es **inmutable y persistente**, garantizando trazabilidad histórica e integridad de los registros.

* Un `Book` **siempre es creado con base en un `BoundAsset` específico**;
* Toda la configuración del asset (como `exponent`) utilizada en el `Book` es **heredada en el momento de la creación**;
* Después de creado, el `Book` **no puede ser reasignado a otro `BoundAsset`**, aun si el asset original es actualizado o descontinuado.

> NOTA: En caso de necesidad de alteración en el `BoundAsset` (como ajuste en el exponente), debe **crearse un nuevo `BoundAsset`**, y a partir de él, nuevos `Books` destinados a las operaciones futuras.

### Relación BoundAsset/Entry

Las `Entries` (asientos contables) representan los registros efectivos de movimiento dentro de un `Ledger`. Están **asociadas indirectamente a un `BoundAsset`**, por medio del `Book` al cual pertenecen.

* Cada `Entry` **hereda el contexto contable del `BoundAsset`** vigente en el `Book` en el momento del asiento;
* Esto garantiza que los valores sean registrados con el `exponent` y `code` correctos;
* Después de creada, la `Entry` **no puede reflejar alteraciones posteriores en el `BoundAsset`**, preservando la representación fiel del evento original.

> NOTA: Este comportamiento está en conformidad con los principios de la **IAS 1 (representación fiel)** y de la **IAS 8 (tratamiento prospectivo de alteraciones contables)**.
