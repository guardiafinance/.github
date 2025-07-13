---
sidebar_position: 0
keywords: [guardia core banking, transactional ledger, ledger as a service, ledger module of guardia, assets, ias-1, ias-8]
---

# Assets

Assets represent the monetary or non-monetary units used in accounting entries within a Ledger and can be classified into two main types:

- **Fiat Assets**: Digital representations of fiat currencies, such as BRL, USD, or EUR, among others.
- **Non-Fiat Assets**: Digital representations of cryptocurrencies (such as BTC, ETH, XRP) or tokenized assets, such as commodities, stocks, or other financial instruments.

## Asset Properties

Each asset has the following properties:

| Field       | Description |
|-------------|-----------|
| `code`      | Alphanumeric identifier of the asset, which can be based on ISO 4217 codes for fiat currencies (e.g., USD for dollar, BRL for real) or can be an arbitrary code (e.g., GRD1 for version 1 of the Guardia Token). |
| `number`    | Numeric identifier of the asset, usually based on the ISO 4217 standard for fiat currencies (e.g., "840" for USD). |
| `exponent`  | Defines the number of decimal places used to represent the smallest fraction of the asset (e.g., 2 for cents in USD — that is, 1 USD = 100 cents). |
| `is_fiat`   | Defines whether the asset is a fiat currency (`true`) or not (`false`). |
| `locations` | List of countries where the asset is accepted. |
| `ledgers`   | List of ledgers where the asset is declared. |
| `metadata`  | Additional information about the asset, which may include description, tags, among others external identifiers. |

For more details about asset properties, see the [Domain Model](../models/index.md#asset) section.

## Asset/Ledger Relationship

Assets are declared and versioned in the context of one or more specific **Ledgers**. This approach ensures that each Ledger maintains a consistent and auditable view of its accounting universe.

The properties `code`, `number`, and `exponent` are defined **per asset, per ledger**. This means that the same asset (such as "USD") can be independently declared in different ledgers with specific configurations. However, it is strongly recommended to maintain consistency between environments to avoid operational conflicts.
