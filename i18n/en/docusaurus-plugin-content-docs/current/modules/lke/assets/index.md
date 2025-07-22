---
sidebar_position: 3
keywords: [guardia core banking, transactional ledger, ledger as a service, guardia ledger module, assets, ias-1, ias-8]
---

# Assets

Assets represent units of value — monetary or non-monetary — used in accounting entries within a Ledger. They can be classified, for operational purposes, into two main types:

- **Fiat**: Digital representations of fiat monetary units, denominated in currencies such as Brazilian Real (BRL), US Dollar (USD), or Euro (EUR), among others with ISO 4217 codes. Use Fiat to represent any asset governed by a financial contract or denominated in fiat currency;

- **Non-Fiat**: Digital representations of cryptocurrencies (such as Bitcoin (BTC), Ethereum (ETH), Ripple (XRP)) or tokenized non-financial assets, such as real estate, carbon credits, or other physical goods not subject to contractual financial settlement. Use Non-Fiat for assets without direct financial contract — such as pure cryptocurrencies, physical real estate, and tokenized assets without financial settlement.

## Asset Classification: Fiat vs. Non-Fiat (Practical Guide)

| Asset Type                                      | Example                         | IFRS Classification             | Fiduciary Classification | Didactic Description                                              |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| Cash or state digital money                     | BRL, USD, EUR                   | Financial Asset                 | **Fiat**                 | Represents physical or official digital money from a government   |
| Equity instrument                               | Common stock, preferred shares  | Financial Asset                 | **Fiat**                 | Represents participation in another entity's capital              |
| Debt instrument                                 | Debentures, bonds, CDB          | Financial Asset                 | **Fiat**                 | Security that gives the right to receive money in the future     |
| Tokenized commodity with cash settlement        | Gold token in USD               | Financial Asset (Derivative)    | **Fiat**                 | Contract that results in financial payment                        |
| Pure cryptocurrencies                          | BTC, ETH, XRP                   | **Non-Financial** (generally)   | **Non-Fiat**             | Decentralized digital assets, without contractual cash rights    |
| Physical asset                                  | Real estate, land               | Non-Financial Asset             | **Non-Fiat**             | Tangible asset not directly linked to financial contract         |
| Real estate token                               | Token representing real estate  | Depends on contract             | **Non-Fiat**             | Can become "Fiat" if there's cash settlement                     |
| Physical commodity                              | Gold, oil, coffee               | Non-Financial Asset             | **Non-Fiat**             | Physically tradable good, without financial contract by itself   |
| Carbon credit                                   | Emission certificate            | Non-Financial Asset             | **Non-Fiat**             | Environmental value unit, without financial settlement contract   |

## Asset Denomination

Each asset has a denomination, which is an object with the following properties:

| Field       | Description |
|-------------|-----------|
| `code`      | Alphanumeric identifier of the asset, which can be based on ISO 4217 codes for fiat currencies (e.g., USD for dollar, BRL for real) or can be an arbitrary code (e.g., GRD1 for version 1 of the Guardia Token). |
| `number`    | Numeric identifier of the asset, usually based on the ISO 4217 standard for fiat currencies (e.g., "840" for USD). |
| `exponent`  | Defines the number of decimal places used to represent the smallest fraction of the asset (e.g., 2 for cents in USD — that is, 1 USD = 100 cents). |
| `locations` | List of countries where the asset is accepted. |

For more details about asset properties, see the [Domain Model](../models/index.md#asset) section.

## Relationships and Normative Effects

### Asset/Ledger Relationship (BoundAsset)

Assets are declared and versioned in the context of one or more `Ledgers` through the intermediate entity `BoundAsset`. This modeling ensures that each `Ledger` maintains an isolated, traceable, and auditable configuration of the assets used in its accounting entries.

The **denomination** of an asset — composed of properties such as `code`, `number`, and `exponent` — defines how this asset is identified, converted, and presented operationally. This denomination is initially established in the scope of the `Asset`, representing its **global and generic** form in the system.

However, when linking an `Asset` to a `Ledger` through a `BoundAsset`, it is possible to **override the original denomination** with specific configurations for that accounting context. This specialization capability allows adapting the asset representation to the **operational, regulatory, or technical requirements** of each ledger.

For example, the global asset "USD" may have as default denomination `exponent = 2`, but be configured with `exponent = 0` in a ledger that operates exclusively with integer values due to systemic restrictions.

> NOTE: This modeling ensures **accounting precision in the local context** (per ledger), without compromising the identity or traceability of the global asset. Additionally, it ensures compliance with the principle of **faithful representation**, according to **IAS 1**.

### BoundAsset/Book Relationship

A `Book` represents the instance of use of a `BoundAsset` by a client or entity within a `Ledger`. This link is **immutable and persistent**, ensuring historical traceability and record integrity.

* A `Book` **is always created based on a specific** `BoundAsset`;
* All asset configuration (such as `exponent`) used in the `Book` is **inherited at the time of creation**;
* After created, the `Book` **cannot be reassigned to another** `BoundAsset`, even if the original asset is updated or discontinued.

> NOTE: In case of need to change the `BoundAsset` (such as exponent adjustment), a new `BoundAsset` must be created, and from it, new `Books` intended for future operations.

### BoundAsset/Entry Relationship

`Entries` (accounting entries) represent the effective movement records within a `Ledger`. They are **indirectly associated with a** `BoundAsset`, through the `Book` to which they belong.

* Each `Entry` **inherits the accounting context of the** `BoundAsset` current in the `Book` at the time of the entry;
* This ensures that values are recorded with the correct `exponent` and `code`;
* After created, the `Entry` **cannot reflect subsequent changes in the** `BoundAsset`, preserving the faithful representation of the original event.

> NOTE: This behavior complies with the principles of **IAS 1 (faithful representation)** and **IAS 8 (prospective treatment of accounting changes)**.
