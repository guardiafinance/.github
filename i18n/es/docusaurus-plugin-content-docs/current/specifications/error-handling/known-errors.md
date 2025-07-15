---
sidebar_position: 0
---

# Errores Conocidos

Este documento lista los errores estandarizados utilizados en la plataforma Guardia. Cada error se describe por su código único y será detallado con su(s) motivo(s) y tratamiento esperado en el futuro.

> **Importante:** Todos los errores DEBEN seguir la estructura definida en [Manejo de Errores](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Mensaje**: El recurso solicitado requiere el envío de un `Idempotency-Key` válido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `Idempotency-Key` sea enviado y formateado correctamente según la [especificación de idempotencia](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Mensaje**: El encabezado `X-Grd-Correlation-Id` no está correctamente formateado.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `X-Grd-Correlation-Id` sea enviado y formateado correctamente según la [especificación de correlación](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Mensaje**: El encabezado `X-Grd-Debug` NO DEBE tener un valor diferente de `true` o `false`.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `X-Grd-Debug` sea enviado y formateado correctamente según la [especificación de depuración](../../specifications/restful/http-headers.md#x-grd-debug).

## ERR400_INVALID_PAYLOAD

## ERR400_INVALID_PARAMETER

### `INVALID_LEDGER_NAME_LENGTH`
- **Mensaje**: El nombre del ledger excede el límite de caracteres permitido o no cumple con el mínimo requerido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Ajustar la longitud del nombre del ledger para cumplir con los límites definidos.

---

### `INVALID_LEDGER_DESCRIPTION_LENGTH`
- **Mensaje**: La descripción del ledger excede el límite de caracteres permitido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Reducir la longitud de la descripción del ledger para cumplir con el límite definido.

---

### `INVALID_PARAMETER_FORMAT`
- **Mensaje**: El formato del cuerpo o de los parámetros enviados en la solicitud es inválido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Consultar la documentación de la API para el formato esperado de los parámetros y del cuerpo de la solicitud, y corregir la solicitud.

---

### `INVALID_METADATA_FORMAT`
- **Mensaje**: El formato de los metadatos enviados es inválido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que los metadatos estén en un formato JSON válido y sigan la estructura esperada.

---

### `INVALID_METADATA_LENGTH`
- **Mensaje**: El tamaño de los metadatos excede el límite permitido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Reducir el tamaño de los metadatos para cumplir con el límite definido.

---

### `INVALID_EXTERNAL_ENTITY_ID_FORMAT`
- **Mensaje**: El formato del ID de entidad externa no es válido.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Verificar que el ID de entidad externa esté correctamente formateado según la especificación de entidades.

## ERR401_UNAUTHORIZED

## ERR402_INSUFFICIENT_FUNDS

## ERR403_FORBIDDEN

## ERR404_NOT_FOUND

### `LEDGER_NOT_FOUND`
- **Mensaje**: El ledger especificado no fue encontrado.
- **Reintento**: Solo si el ledger es creado o el identificador corregido.
- **Tratamiento sugerido**:
  - Verificar si el identificador del ledger es correcto y si el ledger existe.

## ERR405_INVALID_OPERATION

## ERR408_REQUEST_TIMEOUT

## ERR409_SERVER_STATE_CONFLICT

### `CONFLICTING_IDEMPOTENT_REQUEST`
- **Mensaje**: La solicitud no puede ser procesada porque la operación ya fue ejecutada anteriormente con un payload diferente.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Asegurar que el encabezado `Idempotency-Key` sea enviado y formateado correctamente según la [especificación de idempotencia](../../specifications/restful/http-headers.md#idempotency-key).

---

### `EXTERNAL_ENTITY_ID_ALREADY_IN_USE`
- **Mensaje**: El ID de entidad externa proporcionado ya está en uso por otro recurso.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Utilizar un ID de entidad externa diferente o verificar el recurso existente que utiliza el ID informado.

---

### `LEDGER_NAME_ALREADY_IN_USE`
- **Mensaje**: El nombre de ledger proporcionado ya está en uso por otro ledger.
- **Reintento**: ✅ Solo después de la corrección.
- **Tratamiento sugerido**:
  - Elegir un nombre de ledger diferente que aún no esté en uso.

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

