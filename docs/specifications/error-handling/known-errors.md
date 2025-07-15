---
sidebar_position: 0
---

# Erros Conhecidos

Este documento lista os erros padronizados utilizados na plataforma Guardia. Cada erro é descrito por seu código único e será detalhado com seu(s) motivo(s) e tratamento esperado futuramente.

> **Importante:** Todos os erros DEVEM seguir a estrutura definida em [Tratamento de Erros](./index.md).

## ERR400_MISSING_OR_MALFORMED_HEADER

### `IDEMPOTENCY_KEY_REQUIRED`
- **Mensagem**: O recurso solicitado exige o envio de um `Idempotency-Key` válido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `Idempotency-Key` seja enviado e corretamente formatado conforme a [especificação de idempotência](../../specifications/restful/http-headers.md#idempotency-key).

---

### `MALFORMED_CORRELATION_ID`
- **Mensagem**: O header `X-Grd-Correlation-Id` não está corretamente formatado.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `X-Grd-Correlation-Id` seja enviado e corretamente formatado conforme a [especificação de correlação](../../specifications/restful/http-headers.md#x-grd-correlation-id).

---

### `INVALID_DEBUG_HEADER_VALUE`
- **Mensagem**: O header `X-Grd-Debug` não DEVE ter um valor diferente de `true` ou `false`.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `X-Grd-Debug` seja enviado e corretamente formatado conforme a [especificação de debug](../../specifications/restful/http-headers.md#x-grd-debug).


## ERR400_INVALID_PAYLOAD

## ERR400_INVALID_PARAMETER

### `INVALID_LEDGER_NAME_LENGTH`
- **Mensagem**: O nome do ledger excede o limite de caracteres permitido ou não atinge o mínimo necessário.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Ajustar o tamanho do nome do ledger para estar em conformidade com os limites definidos.

---

### `INVALID_LEDGER_DESCRIPTION_LENGTH`
- **Mensagem**: A descrição do ledger excede o limite de caracteres permitido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Reduzir o tamanho da descrição do ledger para estar em conformidade com o limite definido.

---

### `INVALID_PARAMETER_FORMAT`
- **Mensagem**: O formato do body ou dos parâmetros enviados na requisição é inválido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Verificar a documentação da API para o formato esperado dos parâmetros e do corpo da requisição e corrigir a requisição.

---

### `INVALID_METADATA_FORMAT`
- **Mensagem**: O formato dos metadados enviados é inválido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que os metadados estejam em um formato JSON válido e sigam a estrutura esperada.

---

### `INVALID_METADATA_LENGTH`
- **Mensagem**: O tamanho dos metadados excede o limite permitido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Reduzir o tamanho dos metadados para estar em conformidade com o limite definido.

---

### `INVALID_EXTERNAL_ENTITY_ID_FORMAT`
- **Mensagem**: O formato do ID de entidade externa não é válido.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Verificar se o ID de entidade externa está corretamente formatado conforme a especificação de entidades.

## ERR401_UNAUTHORIZED

## ERR402_INSUFFICIENT_FUNDS

## ERR403_FORBIDDEN

## ERR404_NOT_FOUND

### `LEDGER_NOT_FOUND`
- **Mensagem**: O ledger especificado não foi encontrado.
- **Retry**: Somente se o ledger for criado ou o identificador corrigido.
- **Tratamento sugerido**:
  - Verificar se o identificador do ledger está correto e se o ledger existe.

## ERR405_INVALID_OPERATION

## ERR408_REQUEST_TIMEOUT

## ERR409_SERVER_STATE_CONFLICT

### `CONFLICTING_IDEMPOTENT_REQUEST`
- **Mensagem**: A requisição não pode ser processada porque a operação já foi executada anteriormente com um payload diferente.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Assegurar que o header `Idempotency-Key` seja enviado e corretamente formatado conforme a [especificação de idempotência](../../specifications/restful/http-headers.md#idempotency-key).

---

### `EXTERNAL_ENTITY_ID_ALREADY_IN_USE`
- **Mensagem**: O ID de entidade externa fornecido já está em uso por outro recurso.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Utilizar um ID de entidade externa diferente ou verificar o recurso existente que utiliza o ID informado.

---

### `LEDGER_NAME_ALREADY_IN_USE`
- **Mensagem**: O nome do ledger fornecido já está em uso por outro ledger.
- **Retry**: ✅ Somente após correção.
- **Tratamento sugerido**:
  - Escolher um nome de ledger diferente que ainda não esteja em uso.

## ERR422_BUSINESS_ERROR

## ERR429_RATE_LIMITED

## ERR500_INTERNAL_ERROR

## ERR501_FEATURE_NOT_IMPLEMENTED

## ERR503_SERVICE_UNAVAILABLE

## ERR504_GATEWAY_TIMEOUT

