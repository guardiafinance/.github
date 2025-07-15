---
sidebar_position: 0
---

# Known Errors

This document lists the standardized errors used in the Guardia platform. Each error is described by its unique code and will be detailed with its reason(s) and expected treatment in the future.

> **Important:** All errors MUST follow the structure defined in [Error Handling](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Message**: The requested resource requires a valid `Idempotency-Key` to be sent.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `Idempotency-Key` header is sent and correctly formatted according to the [idempotency specification](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Message**: The `X-Grd-Correlation-Id` header is not correctly formatted.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `X-Grd-Correlation-Id` header is sent and correctly formatted according to the [correlation specification](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Message**: The `X-Grd-Debug` header MUST NOT have a value other than `true` or `false`.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `X-Grd-Debug` header is sent and correctly formatted according to the [debug specification](../../specifications/restful/http-headers.md#x-grd-debug).

## ERR400_INVALID_PAYLOAD

## ERR400_INVALID_PARAMETER

### `INVALID_LEDGER_NAME_LENGTH`
- **Message**: The ledger name exceeds the allowed character limit or does not meet the minimum required.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Adjust the ledger name length to comply with the defined limits.

---

### `INVALID_LEDGER_DESCRIPTION_LENGTH`
- **Message**: The ledger description exceeds the allowed character limit.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Reduce the ledger description length to comply with the defined limit.

---

### `INVALID_PARAMETER_FORMAT`
- **Message**: The format of the body or parameters sent in the request is invalid.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Check the API documentation for the expected format of parameters and the request body, and correct the request.

---

### `INVALID_METADATA_FORMAT`
- **Message**: The format of the sent metadata is invalid.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the metadata is in a valid JSON format and follows the expected structure.

---

### `INVALID_METADATA_LENGTH`
- **Message**: The size of the metadata exceeds the allowed limit.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Reduce the metadata size to comply with the defined limit.

---

### `INVALID_EXTERNAL_ENTITY_ID_FORMAT`
- **Message**: The external entity ID format is invalid.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Verify that the external entity ID is correctly formatted according to the entities specification.

## ERR401_UNAUTHORIZED

## ERR402_INSUFFICIENT_FUNDS

## ERR403_FORBIDDEN

## ERR404_NOT_FOUND

### `LEDGER_NOT_FOUND`
- **Message**: The specified ledger was not found.
- **Retry**: Only if the ledger is created or the identifier corrected.
- **Suggested treatment**:
  - Verify if the ledger identifier is correct and if the ledger exists.

## ERR405_INVALID_OPERATION

## ERR408_REQUEST_TIMEOUT

## ERR409_SERVER_STATE_CONFLICT

### `CONFLICTING_IDEMPOTENT_REQUEST`
- **Message**: The request cannot be processed because the operation has already been executed previously with a different payload.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Ensure that the `Idempotency-Key` header is sent and correctly formatted according to the [idempotency specification](../../specifications/restful/http-headers.md#idempotency-key).

---

### `EXTERNAL_ENTITY_ID_ALREADY_IN_USE`
- **Message**: The provided external entity ID is already in use by another resource.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Use a different external entity ID or check the existing resource that uses the informed ID.

---

### `LEDGER_NAME_ALREADY_IN_USE`
- **Message**: The provided ledger name is already in use by another ledger.
- **Retry**: ✅ Only after correction.
- **Suggested treatment**:
  - Choose a different ledger name that is not already in use.

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

