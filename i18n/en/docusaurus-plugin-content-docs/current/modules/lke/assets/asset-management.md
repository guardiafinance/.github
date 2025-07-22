---
sidebar_position: 1
keywords: [guardia core banking, open source core banking, scalable core banking, transactional ledger, real-time transactions]
---

# Asset Updates

Managing Assets in an accounting system requires a balance between operational flexibility and historical integrity. This document defines the rules applicable to Asset updates, considering accounting requirements (IAS/IFRS), technical impacts, and regulatory traceability.

## Updates and Accounting Integrity

In the context of Guardia, an Asset represents a unit of value — monetary or non-monetary — used as the basis for accounting entries recorded in a Ledger. For this reason, some of its properties assume a structural role in the interpretation of entries, directly influencing their accounting validity and future reconciliation. Changes to these attributes after their use in transactions may compromise system integrity and violate fundamental accounting principles.

Specifically, changes to the denomination of an asset — such as `denomination.exponent`, `denomination.code`, or `denomination.number` — should not reflect retroactively on active Ledgers (those that already have transactions). When linking an asset to a ledger, through the creation of a `BoundAsset`, the current denomination is frozen and accurately represents all entries in that context. Any subsequent changes to the global asset denomination will only have prospective effect, applying only to new bindings with ledgers created after the modification. This approach preserves the consistency and integrity of historical records, in compliance with IAS 1.15 principles (faithful representation).

Although IAS 8 deals with retrospective application of changes in accounting policies and correction of material errors, these guidelines do not apply to asset denomination in the system context. Changing attributes such as `denomination.exponent` or `denomination.code` or `denomination.number` does not constitute a change in accounting policy, nor a new estimate or error to be corrected — it is a technical-operational reconfiguration. Furthermore, even if such a change were considered an accounting policy, its retrospective reapplication would be impracticable without compromising the integrity of historical data. IAS 8.25 itself recognizes this limitation: *"if it is impracticable to determine the cumulative effect […] the entity shall adjust […] to apply the new accounting policy prospectively from the earliest date practicable."* Therefore, any change must be applied prospectively, preserving previous BoundAssets and ensuring compliance with IAS 1 and IAS 8 principles.

Given this, updating a global asset must preserve the accounting integrity of ledgers that already use it. Guardia's modeling follows the immutability principle, where changes made to an asset do not retroactively impact existing `BoundAssets`. These changes will only have prospective effect, being applicable exclusively to new bindings with ledgers (i.e., new `BoundAssets`) created after the update.

### Critical Fields of Global Asset

These are the fields that compose the asset denomination and have direct impact on accounting measurement. Therefore, their alteration requires specific controls:

* `denomination.code`: Representative code (e.g., "USD")
* `denomination.number`: ISO number or identifier (e.g., "840")
* `denomination.exponent`: Decimal scale (e.g., 2)

> NOTE: These fields **can be updated in the global asset**, as long as the effects are restricted to new `BoundAssets`. That is, there is no retroactive impact on active ledgers (those with transactions already recorded).

## BoundAsset Updates

A `BoundAsset` represents the instance of an asset within a ledger. When created, it inherits, or can override, the attributes of the global asset at the time of binding, and freezes them from the moment the ledger is activated, ensuring stability and traceability within the accounting context.

### Critical Fields of BoundAsset

* `denomination.code`
* `denomination.number`
* `denomination.exponent`

> NOTE: These fields can only be changed while the ledger is **inactive**, that is, **without committed transactions**. After the first use in an entry, the `BoundAsset` attributes become immutable.

**Expected behavior in case of attempted change in active ledger**

* HTTP Status: `422 Unprocessable Entity`
* Error code: `ERR422_BUSINESS_ERROR`
* Message: `LEDGER_HAS_TRANSACTIONS`

**Example of rejected attempt**

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

> IMPORTANT: To change the attributes of a `BoundAsset`, you must create a new `BoundAsset` with the desired attributes, link this new resource to the ledger and then discard the previous binding, if desired. This procedure is described in the [BoundAsset Updates](#boundasset-updates) section and ensures the immutability of parameters used in entries already made.

## Asset Disposal

Disposing of a global Asset means making it unavailable for new bindings with ledgers. This operation does not modify or invalidate existing bindings or records, but prevents the asset from being used in future `BoundAsset` creations.

### Rules for global Asset disposal

- **Can be disposed**: even if the asset is linked to existing Ledgers (with or without transactions).
- **Disposal effect**: prevents the creation of new `BoundAssets` from the disposed asset.

**Restrictions**

- The system must only prevent new bindings (not retroactive use).

- No modifications are made to existing `BoundAssets`.

**Example of allowed disposal**

```json
DELETE /v1/assets/{asset_identifier}
// Result: 204 No Content
// Effect: asset is marked as disposed; existing bindings remain valid
```

## BoundAsset Disposal

Disposing of a `BoundAsset` represents the deactivation of a specific binding between an asset and a ledger. After disposal, the `BoundAsset` can no longer be used for creating books or accounting records.

### Rules for BoundAsset disposal

- **Can be physically disposed**: if, and only if, the `BoundAsset` **has not been used** in any accounting entry.
- **Can be logically disposed**: when the `BoundAsset` **has been used** in any accounting entry.
  - **Disposal effect**: prevents the creation of new `Books` from the disposed `BoundAsset`.

## References

- [IAS 1 – Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8 – Accounting Policies, Changes in Accounting Estimates and Errors](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
