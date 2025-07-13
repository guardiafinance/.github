---
sidebar_position: 4
---

# Paginations

This specification defines a unified **pagination** standard for all Guardia RESTful API endpoints that return resource lists. The goal is to ensure consistency between interfaces, predictability in data consumption, and interoperability between internal and external systems.

Standardizing pagination **prevents systemic overloads**, improves response time, and reduces computational resource usage. It aligns with [Compliance by Design](../../community/governance/COMPLIANCE.md) principles, such as:

  - *Efficiency*: through efficient pagination mechanisms, with data minimization, avoiding excessive returns.
  - *Transparency and auditability*: providing structured and traceable responses.
  - *Predictability*: allowing consumers to predict the behavior and outcome of pagination operations.

It supports **efficient integrations** with external tools and promotes internal component reuse.

## Request

Guardia systems MUST offer the following pagination mechanisms:

| Parameter                       | Type    | Default     | Maximum |
|--------------------------------|---------|-------------|---------|
| [`page_size`](#page_size)      | uint32  | 20          | 100     |
| [`page_token`](#page_token)    | string  | -           | -       |
| [`order_by`](#order_by)        | string  | created_at  | -       |
| [`sort`](#sort)                | string  | asc         | -       |

### Pagination Parameters

Systems that expose paginable resources MUST implement the following pagination control parameters. These parameters MUST be accepted via query string in pagination-compatible endpoints.

#### `page_size`
- MUST be an integer representing the number of items per page.
- WHEN not specified, MUST assume the default value of `20`.
- MUST NOT exceed the maximum value of `100`.
- Requests with values above the limit MUST be rejected with a validation error.

#### `page_token`
- MUST be an opaque token representing the current pagination position.
- MUST be returned by the system in previous calls, when applicable.
- The token format and semantics are the system's responsibility and MUST be treated as opaque by the client.

#### `order_by`
- MUST be a string indicating the base property for ordering results.
- WHEN not informed, MUST assume the default value `created_at`.
- ALLOWED values include `created_at`, `updated_at` and `reference_date`.
- ANY other value provided MUST be rejected with a validation error.

#### `sort`
- MUST be a string indicating the ordering direction.
- ALLOWED values are `asc` (ascending order) and `desc` (descending order).
- WHEN not informed, MUST assume `desc`.

## Response

The response MUST contain the following properties:

| Property                                                              | Type   |
|-----------------------------------------------------------------------|--------|
| [`data`](#data)                                                       | array  |
| [`pagination`](#pagination)                                           | object |
| [`pagination.page_size`](#paginationpage_size)                       | uint32 |
| [`pagination.next_page_token`](#paginationnext_page_token)           | string |
| [`pagination.previous_page_token`](#paginationprevious_page_token)   | string |
| [`pagination.first_page_token`](#paginationfirst_page_token)         | string |
| [`pagination.last_page_token`](#paginationlast_page_token)           | string |
| [`pagination.total_count`](#paginationtotal_count)                   | uint32 |

### Payload Structure

Responses from endpoints that implement pagination MUST follow the structure below. The `pagination` object MUST contain the metadata necessary for navigation between pages in a secure, efficient, and server-state-independent manner.

#### `data`
- MUST be an array containing the items of the current page.
- EACH item MUST follow the resource structure defined for the consulted endpoint.

#### `pagination`
- MUST be an object containing pagination metadata.
- All `pagination` properties MUST be present, even if null when not applicable.

##### `pagination.page_size`
- MUST be a positive integer (`uint32`) representing the number of items per page in the response.

##### `pagination.total_count`
- MUST be a positive integer (`uint32`) representing the total number of records available in the original query.
- MAY be omitted in highly scalable pagination scenarios where the complete count affects performance.

##### `pagination.first_page_token`
- MAY be a string representing the first page token.
- MUST be treated as an auxiliary resource for clients that wish to restart navigation.

##### `pagination.previous_page_token`
- MAY be a string representing the previous page token.
- WHEN missing or null, indicates this is the first page in the sequence.

##### `pagination.next_page_token`
- MAY be a string representing the next page token.
- WHEN missing or null, indicates there are no more following pages.

##### `pagination.last_page_token`
- MAY be a string representing the last page token.
- MUST be optionally used by clients to jump to the end of the sequence.

#### JSON Example
```json
{
  "data": [
    { "id": "abc", "name": "Item A" },
    { "id": "def", "name": "Item B" }
  ],
  "pagination": {
    "page_size": 20,
    "total_count": 200,
    "first_page_token": "eyJhbGciOi...",
    "previous_page_token": "eyJhbGciOi...",
    "next_page_token": "eyJhbGciOi...",
    "last_page_token": "eyJhbGciOi..."
  }
}
```

For more details about general response conventions, see the [Response Payloads specification](../restful/http-response-payloads.md).

### Headers

| Header            | Type    | Value       |
|-------------------|---------|-------------|
| `Cache-Control`   | string  | max-age=900 |
| `Link`            | string  | -           |

Example:

```
link:
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={first_page_token}>; rel="first",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={previous_page_token}>; rel="previous",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={next_page_token}>; rel="next",
<https://{tenant_id}.guardia.finance/api/v1/ledgers?page_token={last_page_token}>; rel="last"
```

Learn more about the HTTP headers that Guardia uses [here](./http-headers.md).

## Expected Behaviors

### Pagination
- Filters and pagination MUST be combinable.
- If `page_token` is not provided, the API MUST return the first page of results, respecting the default ordering and `page_size = 20`.
- Endpoints that return with pagination MUST ensure support for reverse pagination, with `previous_page_token` and `first_page_token`.
- Item ordering MUST be stable and deterministic.

### Page Tokens
- `page_token` MUST expire securely or be validated by usage time.
- The page_token lifetime MUST be compatible with the response's `Cache-Control` header cache time.
- The properties `first_page_token` and `last_page_token` MUST be returned whenever technically possible, but MAY be omitted for payload or performance optimization.
- Properties such as `previous_page_token`, `next_page_token`, `first_page_token`, and `last_page_token` are EXCLUSIVE to the response and MUST NOT be used as input.

### Response
- If there are no results, the API MUST return `200 OK` with an empty list and `pagination.total_count = 0`.
- If there are invalid pagination parameters, the API MUST result in `400 Bad Request` with the code `ERR400_INVALID_PARAMETER` and the respective error reason.
- The response MUST contain a body according to the [Guardia response payloads specification](../restful/http-response-payloads.md) for both success and error.

## Security, Expiration, and Compliance
- All `*_page_token` properties MUST be opaque tokens (encrypted or signed), without containing any readable or decodable structure by the client.
- Pagination tokens MUST expire within a reasonable time (e.g., 10 minutes) to prevent misuse.
- Every request MUST be logged with `X-Grd-Trace-Id`.
- Implementation MUST respect client authorization scopes.

## Known Errors

| Scenario                           | HTTP Code   | Code                        | Reason                |
|------------------------------------|-------------|-----------------------------|-----------------------|
| invalid `page_token`               | `400`       | `ERR400_INVALID_PARAMETER`   | `PAGE_TOKEN_INVALID`  |
| expired `page_token`               | `400`       | `ERR400_INVALID_PARAMETER`   | `PAGE_TOKEN_EXPIRED`  |
| invalid `page_size`                | `400`       | `ERR400_INVALID_PARAMETER`   | `PAGE_SIZE_INVALID`   |
| `page_size` above limit            | `400`       | `ERR400_INVALID_PARAMETER`   | `PAGE_SIZE_TOO_LARGE` |
| invalid `order_by`                 | `400`       | `ERR400_INVALID_PARAMETER`   | `ORDER_BY_INVALID`    |
| invalid `sort`                     | `400`       | `ERR400_INVALID_PARAMETER`   | `SORT_INVALID`        |

#### Error Example (JSON)
```json
{
  "errors": [
    {
      "code": "ERR400_INVALID_PARAMETER",
      "reason": "PAGE_TOKEN_INVALID",
      "message": "The page token provided has an incorrect format. Please check the token before trying again."
    }
  ]
}
```

## When to Use
- This specification MUST be applied to any REST API that returns resource lists.
- Even when the API returns a resource list with only one item, the specification MUST be applied.
- Existing APIs and contracts MUST be adapted progressively according to version evolution or migration.

## Additional Notes

- Pagination MUST be documented in the API OAS contract.
- Pagination described here is considered the **minimum standard** for any Guardia RESTful API.

## References
- [GitHub - REST API Pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [HATEOAS](https://restfulapi.net/hateoas)
