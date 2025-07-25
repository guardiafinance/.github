---
sidebar_position: 5
---

# Ordenação

Esta especificação define os requisitos obrigatórios para **ordenar recursos** em endpoints que retornam listas na plataforma Guardia, utilizando exclusivamente **propriedades temporais** como critério de ordenação.

A ordenação será feita por meio dos parâmetros `order_by` e `sort`, fornecidos na query string da requisição HTTP.

## Regras Gerais

A ordenação DEVE:

- Ser limitada aos seguintes propriedades temporais como por exemplo: `created_at`, `updated_at` ou `reference_at`.
- Utilizar **índices** disponíveis no banco de dados para otimizar desempenho e evitar varreduras completas (full scan).
- Considerar particionamento por faixa temporal, quando aplicável, para ganhos de performance em grandes volumes.
- Ser **estável**: registros com o mesmo valor em `order_by` DEVEM manter ordem relativa consistente (ex: por `entity_id` como critério secundário).
- Produzir resultados consistentes com os parâmetros recebidos e com a lógica de [paginação](./http-pagination.md) associada.

Essas diretrizes reduzem ambiguidades entre sistemas consumidores, promovem previsibilidade nos retornos e estão alinhadas aos princípios de [Compliance by Design](../../community/governance/COMPLIANCE.md), especialmente em eficiência.

### Parâmetros de ordenação

| Parâmetro  | Obrigatório | Valores permitidos                          | Padrão       |
|------------|-------------|----------------------------------------------|--------------|
| `order_by` | Não         | `created_at`, `updated_at`, `reference_at` | `created_at` |
| `sort`     | Não         | `asc`, `desc`                                | `asc`        |

> **NOTA:** Ambos os parâmetros são opcionais. Em sua ausência, aplica-se a ordenação `created_at asc`.

### Exemplos de requisição

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at // assume a ordenação padrão ascendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=asc // assume a ordenação ascendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=created_at&sort=ASC // case insensitive
```

```http
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=desc // assume a ordenação descendente
GET https://{tenant_id}.guardia.finance/api/v1/ledgers?order_by=reference_at&sort=DESC // case insensitive
```

### Comportamentos esperados

- Ausência de parâmetros deve assumir os valores padrão.
- `order_by` deve aceitar apenas os valores permitidos no endpoint. Outros valores DEVEM resultar em `400 Bad Request`.
- `sort` deve aceitar apenas os valores `asc` ou `desc` (case insensitive). Outros valores DEVEM resultar em `400 Bad Request`.

## Erros Conhecidos

| Cenário | Código HTTP | Code | Reason |
|--------|---------------------|--------|------|
| `order_by` inválido | `400` | `ERR400_INVALID_PARAMETER` | `ORDER_BY_INVALID` |
| `sort` inválido | `400` | `ERR400_INVALID_PARAMETER` | `SORT_INVALID` |


#### Exemplo de erro (JSON)
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

## Quando aplicar

- Esta especificação DEVE ser aplicada a **todos os endpoints pagináveis** que retornem listas ordenadas por tempo.

**Exceções permitidas**

- Endpoints com ordenação fixa por regra de negócio PODEM omitir `order_by`, desde que registrado em um [Registro de Decisão de Produto (PDR)](../../community/governance/index.md#registros-de-decisão-de-produto-pdr).

## Notas adicionais

- A ordenação DEVE ser documentada no contrato OAS da API.
- A ordenação temporal aqui descrita é considerada **padrão mínimo** para qualquer API RESTful da Guardia.
