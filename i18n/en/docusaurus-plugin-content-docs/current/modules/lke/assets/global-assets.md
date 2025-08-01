---
sidebar_position: 1
keywords: [guardia core banking, transactional ledger, ledger as a service, ledger kernel engine, global assets, asset classification, fiat, non-fiat]
---

# Global Assets

Global Assets represent universal definitions of value units — monetary or non-monetary — that serve as standards for creating specific representations within different accounting contexts (Ledgers).

They establish a common and traceable identity for assets that can be used across multiple ledgers, ensuring operational consistency and facilitating reconciliations between different accounting systems.

## Operational Classification: Fiat vs. Non-Fiat

Assets can be classified, for operational purposes, into two main types based on the nature of their backing and settlement method:

### Fiat Assets

Digital representations of fiat monetary units or financial instruments with contractual rights to cash flows. Include:

- **Sovereign currencies**: Denominated in ISO 4217 codes such as Brazilian Real (BRL), US Dollar (USD), or Euro (EUR)
- **Equity instruments**: Common and preferred shares representing corporate ownership
- **Debt instruments**: Debentures, bonds, CDBs, and other securities with future receivable rights
- **Tokenized commodities with financial settlement**: Tokens that result in fiat currency payments

### Non-Fiat Assets

Digital representations of cryptocurrencies or tokenized non-financial assets, without direct contractual rights to cash flows in fiat currency. Include:

- **Pure cryptocurrencies**: Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), and other decentralized currencies
- **Tokenized physical goods**: Real estate, land, and other tangible assets represented digitally
- **Physical commodities**: Gold, oil, coffee traded physically
- **Environmental certificates**: Carbon credits and other environmental value instruments

> NOTE: IFRS classification depends on what the contract actually represents in economic terms — that is, the substance of the operation and the real effects it generates, even if the legal form says otherwise. This principle, called substance over form (IAS 1, par. 15), ensures that accounting faithfully shows the rights and obligations that actually exist.

## Practical Classification Guide

| Asset Type                                      | Example                         | IFRS Classification             | Operational Classification | Description                                                       |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| Cash or sovereign digital money                 | BRL, USD, EUR                   | Financial Asset                 | **Fiat**                  | Represents physical or official digital money from a government   |
| Equity instrument                               | Common shares, preferred shares | Financial Asset                 | **Fiat**                  | Represents ownership participation in another entity              |
| Debt instrument                                 | Debentures, bonds, CDB          | Financial Asset                 | **Fiat**                  | Security that gives the right to receive money in the future     |
| Tokenized commodity with cash settlement        | Gold token in USD               | Financial Asset (Derivative)    | **Fiat**                  | Contract that results in financial payment                       |
| Pure cryptocurrencies                          | BTC, ETH, XRP                   | **Non-Financial** (generally)  | **Non-Fiat**              | Decentralized digital assets, without contractual cash rights    |
| Physical good                                   | Real estate, land               | Non-Financial Asset             | **Non-Fiat**              | Tangible asset not directly linked to financial contract         |
| Real estate token                               | Token representing real estate  | Depends on contract             | **Non-Fiat**              | May become "Fiat" if there is cash settlement                    |
| Physical commodity                              | Gold, oil, coffee               | Non-Financial Asset             | **Non-Fiat**              | Physically tradable good, without financial contract per se      |
| Carbon credit                                   | Emission certificate            | Non-Financial Asset             | **Non-Fiat**              | Environmental value unit, without financial settlement contract   |

## Denomination Structure

Every Global Asset has a standardized denomination that defines its identification and operational representation. The denomination consists of the following elements:

### Denomination Properties

| Field       | Description                                                                                                                                    | Example         |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| `code`      | Alphanumeric identifier of the asset, based on ISO 4217 codes for fiat currencies or arbitrary code for other assets                        | USD, BTC, GRD1  |
| `number`    | Numeric identifier of the asset, generally based on the ISO 4217 standard for fiat currencies                                               | 840 (USD)       |
| `exponent`  | Number of decimal places used to represent the smallest fraction of the asset                                                                | 2 (cents)       |

### Denomination Examples

**US Dollar:**
```json
{
  "code": "USD",
  "number": 840,
  "exponent": 2
}
```

**Brazilian Real:**
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

## References

- [Domain Model - Asset](../models/index.md#asset)
- [Bound Assets - Context Specialization](./bound-assets.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)