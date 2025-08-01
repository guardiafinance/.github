---
sidebar_position: 3
keywords: [guardia core banking, transactional ledger, ledger as a service, ledger kernel engine, assets, global assets, bound assets, ias-1, ias-8]
---

# Assets Overview

Assets in the LKE (Ledger Kernel Engine) represent value units — monetary or non-monetary — used in accounting entries. The system implements a two-level architecture that combines operational flexibility with accounting integrity.

## Assets Architecture

### Global Assets
**Universal definitions** that establish standards for assets that can be used across multiple accounting contexts. They serve as templates that ensure consistency and facilitate reconciliations between different systems.

- Maintain common and traceable identity
- Define standardized denominations
- Classify assets by operational type (Fiat vs Non-Fiat)

### Bound Assets
**Contextual specializations** of Global Assets within specific Ledgers. They allow adaptations for specific operational, regulatory, or technical needs without compromising global traceability.

- Override specific configurations when necessary
- Maintain link with the original Global Asset
- Ensure immutability of accounting relationships

## Usage Flow

```
Global Asset (USD)
       ↓
Bound Asset (USD in Ledger A)
       ↓
Book (Client X's Wallet)
       ↓
Entries (Accounting transactions)
```

## Detailed Documentation

### [Global Assets](./global-assets.md)
Complete specification on universal asset definitions, including:
- Operational classification (Fiat vs Non-Fiat)
- Standardized denomination structure
- Practical classification guides
- Configuration examples

### [Bound Assets](./bound-assets.md)
Specification on contextual asset specialization, covering:
- Asset binding to specific Ledgers
- Relationships with Books and Entries
- Accounting integrity guarantees
- Compliance with IAS 1 and IAS 8 standards

## Fundamental Principles

### Global Traceability
All asset usage maintains a link with its global definition, enabling cross-ledger reconciliations and auditing.

### Accounting Immutability
Once relationships between Bound Assets, Books, and Entries are established, they are preserved to ensure historical integrity.

### Controlled Specialization
Allows necessary contextual adaptations without compromising the identity and consistency of global assets.

### Regulatory Compliance
Alignment with international accounting principles, especially IAS 1 (faithful representation) and IAS 8 (prospective treatment).

## Technical References

- [Domain Model](../models/index.md)
- [Books - Usage Instances](../books/index.md)
- [API Reference](../../api/lke/introducao/)