---
sidebar_position: 2
keywords: [guardia core banking, transactional ledger, ledger as a service, bound assets, asset binding, asset contextualization, ias-1, ias-8]
---

# Bound Assets

Bound Assets represent the contextual specialization of Global Assets within specific Ledgers. They allow the same global asset to be configured differently to meet the operational, regulatory, or technical needs of each accounting context.

This approach ensures operational flexibility without compromising global asset traceability, enabling specific configurations such as changing exponents, codes, or metadata according to each Ledger's requirements.

## Purpose and Contextualization

### Why Bound Assets Are Necessary

Contextual binding solves common operational challenges in multi-ledger systems:

- **Regulatory adaptation**: Different jurisdictions may require distinct representations of the same asset
- **Operational precision**: Legacy systems may have specific technical limitations (e.g., integer values only)
- **Accounting compliance**: Aligned with IAS 1 (par. 15–17), ensures faithful representation of economic phenomena
- **Auditability**: Maintenance of clear trails between global configuration and contextual usage

### Denomination Specialization

When a Global Asset is bound to a Ledger, it's possible to **selectively override** elements of its original denomination:

**Practical Example:**
- **Global Asset USD**: `exponent = 2` (standard: cents)
- **Bound Asset USD in Ledger A**: `exponent = 2` (maintains global configuration)
- **Bound Asset USD in Ledger B**: `exponent = 0` (integer values only due to system limitations)

This flexibility allows the same global asset to be used in different contexts without operational conflicts.

## Relationships and Accounting Integrity

### Bound Asset → Book Relationship

The creation of Books (wallets) follows strict immutability principles to ensure historical integrity:

#### Fundamental Rules

- **Unique binding**: A Book is **ALWAYS** created based on a specific Bound Asset
- **Inheritance at creation**: All Bound Asset configuration (denomination, exponent, metadata) is **inherited and frozen** at the moment of Book creation
- **Immutability**: Once created, a Book **CANNOT** be reassigned to another Bound Asset

#### Change Management

When there's a need to modify Bound Asset configurations:

1. **New version creation**: A new Bound Asset must be created with updated configurations
2. **Future Books**: New Books must reference the updated Bound Asset
3. **Existing Books**: Remain linked to the original configuration, preserving accounting history

```
Global Asset: USD
│
├── Ledger A: Bound Asset (exponent: 2)
│   ├── Book A
│   └── Book B
│
└── Ledger B: Bound Asset (exponent: 0) 
    ├── Book C
    └── Book D
```

### Bound Asset → Entry Relationship (via Book)

Entries (accounting entries) inherit the Bound Asset context **indirectly**, through the Book:

#### Contextual Inheritance Flow

1. **Bound Asset** defines specific asset configuration in the Ledger
2. **Book** inherits and freezes these configurations at creation time
3. **Entry** uses the frozen Book configurations for its transactions

#### Integrity Guarantees

- **Faithful representation**: Each Entry reflects exactly the configurations in effect when the Book was created
- **Historical immutability**: Subsequent changes to the Bound Asset do not affect already created Entries
- **Accounting consistency**: All transactions from a Book maintain the same asset representation

## Regulatory Compliance

### Alignment with IAS 1 (Faithful Representation)

The Bound Assets modeling ensures **faithful representation** of accounting events:

- **Contextual precision**: Each Ledger can configure assets according to its specific needs
- **Transparency**: The global origin of the asset remains traceable
- **Consistency**: Configurations are applied uniformly within each context

### Alignment with IAS 8 (Prospective Treatment)

Change management follows the prospective principle:

- **Future effect**: Changes to Bound Assets only affect future operations
- **Historical preservation**: Previous records maintain their original representation
- **Documentation**: Each Bound Asset version maintains an audit trail

## When to Use Bound Assets

### Recommended Scenarios

- **Multi-jurisdiction**: When the same asset needs to be represented differently in distinct jurisdictions
- **Heterogeneous systems**: When different Ledgers have specific technical limitations
- **Specific compliance**: When local regulations require particular configurations
- **Controlled evolution**: When asset configurations need to evolve while maintaining intact history

### When to Consider Alternatives

- **Single context**: If the asset will only be used in one specific Ledger, consider defining directly as Global Asset
- **Volatile configuration**: For assets with frequently changing configurations, evaluate if versioning overhead is worthwhile

## Expected Behaviors

### Bound Asset Creation

```http
POST /ledgers/{ledger-id}/assets
Content-Type: application/json

{
  "global_asset_id": "usd-global-v1",
  "denomination": {
    "code": "USD",
    "exponent": 0  // Overrides the global exponent (2)
  }
}
```

### Automatic Inheritance

- **Unspecified fields**: Automatically inherit from Global Asset
- **Specified fields**: Override global configuration
- **Traceability**: Link to Global Asset is always maintained

### Transparent Versioning

- **Unique IDs**: Each Bound Asset version receives an exclusive identifier
- **Versioning metadata**: Timestamps and references for auditing
- **Backward compatibility**: Old Books continue functioning normally

## Limitations and Restrictions

- **Book immutability**: Once activated (i.e., received its first entry), a Book cannot be reassigned
- **Unidirectional propagation**: Changes in Global Assets do not automatically propagate to Bound Assets
- **Operational overhead**: Each change requires creating a new version

## References

- [Global Assets - Universal Definitions](./global-assets.md)
- [Domain Model - Bound Asset](../models/index.md#boundasset)
- [Books](../books/index.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8: Accounting Policies, Changes in Accounting Estimates and Errors](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 21: The Effects of Changes in Foreign Exchange Rates](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-21-the-effects-of-changes-in-foreign-exchange-rates.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)