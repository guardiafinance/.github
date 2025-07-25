---
sidebar_position: 5
---

# Sorting

This specification defines the mandatory requirements for **sorting resources** in endpoints that return lists on the Guardia platform, using exclusively **temporal properties** as sorting criteria.

Sorting will be done through the `order_by` and `sort` parameters, provided in the HTTP request query string.

## General Rules

Sorting MUST:

- Be limited to the following temporal properties such as: `created_at`, `updated_at` or `reference_at`.
- Use available **indexes** in the database to optimize performance and avoid full scans.
- Consider temporal range partitioning, when applicable, for performance gains with large volumes.
- Be **stable**: records with the same value in `order_by` MUST maintain consistent relative order (e.g., by `entity_id` as a secondary criterion).
- Produce results consistent with the received parameters and with the associated [pagination](./http-pagination.md) logic.

These guidelines reduce ambiguities between consumer systems, promote predictability in returns, and are aligned with [Compliance by Design](../../community/governance/COMPLIANCE.md) principles, especially in auditing, traceability, and governance.

### Sorting parameters

| Parameter  | Required | Allowed values                          | Default       |
|------------|----------|-----------------------------------------|---------------|
| `order_by` | No       | `created_at`, `updated_at`, `reference_at` | `created_at` |
| `sort`     | No       | `asc`, `desc`                           | `asc`         |

> **NOTE:** Both parameters are optional. In their absence, the `created_at asc` sorting is applied.

### Request examples

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at // assumes default ascending order
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=asc // assumes ascending order
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=ASC // case insensitive
```

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=desc // assumes descending order
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=DESC // case insensitive
```

### Expected behaviors

- Absence of parameters should assume default values.
- `order_by` must accept only the allowed values in the endpoint. Other values MUST result in `400 Bad Request`.
- `sort` must accept only the values `asc` or `desc` (case insensitive). Other values MUST result in `400 Bad Request`.

## Known Errors

| Scenario | HTTP Code | Code | Reason |
|----------|-----------|------|--------|
| Invalid `order_by` | `400` | `ERR400_INVALID_PARAMETER` | `ORDER_BY_INVALID` |
| Invalid `sort` | `400` | `ERR400_INVALID_PARAMETER` | `SORT_INVALID` |

#### Error example (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_PARAMETER",
      "reason": "ORDER_BY_INVALID",
      "message": "The order_by provided has an incorrect format. Please check the order_by before trying again."
    }
  ]
}
```

## When to apply

- This specification MUST be applied to **all paginable endpoints** that return time-ordered lists.

**Allowed exceptions**

- Endpoints with fixed ordering by business rule MAY omit `order_by`, as long as it is recorded in a [Product Decision Record (PDR)](../../community/governance/index.md#product-decision-records-pdr).

## Additional notes

- Sorting MUST be documented in the API OAS contract.
- The temporal sorting described here is considered the **minimum standard** for any Guardia RESTful API.
