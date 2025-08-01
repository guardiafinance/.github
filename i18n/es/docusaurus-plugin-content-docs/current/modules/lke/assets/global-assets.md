---
sidebar_position: 1
keywords: [guardia core bancario, libro mayor transaccional, libro mayor como servicio, kernel de libro mayor, activos globales, clasificación de activos, fiat, non-fiat]
---

# Activos Globales (Global Assets)

Los Activos Globales representan definiciones universales de unidades de valor — monetarias o no monetarias — que sirven como estándar para la creación de representaciones específicas dentro de diferentes contextos contables (Ledgers).

Establecen una identidad común y trazable para assets que pueden ser utilizados en múltiples ledgers, garantizando consistencia operacional y facilitando reconciliaciones entre diferentes sistemas contables.

## Clasificación Operacional: Fiat vs. Non-Fiat

Los assets pueden clasificarse, para fines operacionales, en dos tipos principales basados en la naturaleza de su respaldo y forma de liquidación:

### Activos Fiduciarios (Fiat)

Representaciones digitales de unidades monetarias fiduciarias o instrumentos financieros con derecho contractual a flujos de efectivo. Incluyen:

- **Monedas soberanas**: Denominadas en códigos ISO 4217 como Real Brasileño (BRL), Dólar Americano (USD) o Euro (EUR)
- **Instrumentos patrimoniales**: Acciones ordinarias y preferentes que representan participación societaria
- **Instrumentos de deuda**: Debentures, bonos, CDB y otros títulos con derecho de cobro futuro
- **Commodities tokenizadas con liquidación financiera**: Tokens que resultan en pagos en moneda fiduciaria

### Activos No-Fiduciarios (Non-Fiat)

Representaciones digitales de criptomonedas o activos tokenizados no financieros, sin derecho contractual directo a flujos de efectivo en moneda fiduciaria. Incluyen:

- **Criptomonedas puras**: Bitcoin (BTC), Ethereum (ETH), Ripple (XRP) y otras monedas descentralizadas
- **Bienes físicos tokenizados**: Inmuebles, terrenos y otros activos tangibles representados digitalmente
- **Commodities físicas**: Oro, petróleo, café negociados físicamente
- **Certificados ambientales**: Créditos de carbono y otros instrumentos de valor ambiental

> NOTA: La clasificación IFRS depende de lo que el contrato realmente representa en términos económicos — es decir, de la esencia de la operación y los efectos reales que genera, aunque la forma legal diga otra cosa. Este principio, llamado sustancia sobre forma (IAS 1, par. 15), garantiza que la contabilidad muestre con fidelidad los derechos y obligaciones que realmente existen.

## Guía de Clasificación Práctica

| Tipo de Activo                                  | Ejemplo                         | Clasificación IFRS              | Clasificación Operacional | Descripción                                                       |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| Dinero en efectivo o digital estatal           | BRL, USD, EUR                   | Activo Financiero               | **Fiat**                  | Representa dinero físico o digital oficial de un gobierno        |
| Instrumento patrimonial                         | Acciones ordinarias, preferentes| Activo Financiero               | **Fiat**                  | Representa participación en el capital de otra entidad           |
| Instrumento de deuda                            | Debentures, bonos, CDB          | Activo Financiero               | **Fiat**                  | Título que da derecho a recibir dinero en el futuro              |
| Commodity tokenizada con liquidación en dinero | Token de oro en USD             | Activo Financiero (Derivativo)  | **Fiat**                  | Contrato que resulta en pago financiero                          |
| Criptomonedas puras                             | BTC, ETH, XRP                   | **No Financiero** (generalmente)| **Non-Fiat**             | Activos digitales descentralizados, sin derecho contractual de efectivo |
| Bien físico                                     | Inmueble, terreno               | Activo No Financiero            | **Non-Fiat**             | Activo tangible no vinculado directamente a contrato financiero  |
| Token de inmueble                               | Token representando inmueble    | Depende del contrato            | **Non-Fiat**             | Puede convertirse en "Fiat" si hay liquidación en dinero         |
| Commodity física                                | Oro, petróleo, café             | Activo No Financiero            | **Non-Fiat**             | Bien negociable físicamente, sin contrato financiero por sí solo |
| Crédito de carbono                              | Certificado de emisión          | Activo No Financiero            | **Non-Fiat**             | Unidad de valor ambiental, sin contrato de liquidación financiera|

## Estructura de Denominación

Todo Activo Global posee una denominación estandarizada que define su identificación y representación operacional. La denominación está compuesta por los siguientes elementos:

### Propiedades de la Denominación

| Campo       | Descripción                                                                                                                                    | Ejemplo         |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| `code`      | Identificador alfanumérico del activo, basado en códigos ISO 4217 para monedas fiduciarias o código arbitrario para otros assets            | USD, BTC, GRD1  |
| `number`    | Identificador numérico del activo, generalmente basado en el estándar ISO 4217 para monedas fiduciarias                                     | 840 (USD)       |
| `exponent`  | Número de casas decimales utilizadas para representar la menor fracción del activo                                                           | 2 (centavos)    |

### Ejemplos de Denominación

**Dólar Americano:**
```json
{
  "code": "USD",
  "number": 840,
  "exponent": 2
}
```

**Real Brasileño:**
```json
{
  "code": "BRL", 
  "number": 986,
  "exponent": 2
}
```

**Bitcoin:**
```json
{
  "code": "BTC",
  "number": null,
  "exponent": 8
}
```

## Referencias

- [Modelo de Dominio - Asset](../models/index.md#asset)
- [Activos Vinculados - Especialización de Contexto](./bound-assets.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)