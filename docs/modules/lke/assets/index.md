---
sidebar_position: 0
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, assets, ias-1, ias-8]
---

# Ativos (Assets)

Ativos representam as unidades monetárias ou não monetárias utilizadas nos lançamentos contábeis dentro de um Ledger e podem ser classificados em dois tipos principais:

- **Ativos Fiat**: Representações digitais de moedas fiduciárias, como BRL, USD ou EUR, entre outras.
- **Ativos Não-Fiat**: Representações digitais de criptomoedas (como BTC, ETH, XRP) ou de ativos tokenizados, como commodities, ações ou outros instrumentos financeiros.

## Propriedades do Ativo

Cada ativo possui as seguintes propriedades:

| Campo       | Descrição |
|-------------|-----------|
| `code`      | Identificador alfanumérico do ativo, que pode ser baseado em códigos ISO 4217 para moedas fiduciárias (ex: USD para dólar, BRL para real) ou pode ser um código arbitrário (ex: GRD1 para a versão 1 do Guardia Token). |
| `number`    | Identificador numérico do ativo, geralmente baseado no padrão ISO 4217 para moedas fiduciárias (ex: "840" para USD). |
| `exponent`  | Define o número de casas decimais utilizadas para representar a menor fração do ativo (ex: 2 para centavos em USD — ou seja, 1 USD = 100 cents). |
| `is_fiat`   | Define se o ativo é uma moeda fiduciária (`true`) ou não (`false`). |
| `locations` | Lista de países em que o ativo é aceito. |
| `ledgers`   | Lista de ledgers nos quais o ativo está declarado. |
| `metadata`  | Informações adicionais sobre o ativo, que podem incluir descrição, tags, entre outros dados externos. |

Para mais detalhes sobre as propriedades do ativo, consulte a seção [Modelo de Domínio](../models/index.md#asset).

## Relação Asset/Ledger

Os ativos são declarados e versionados no contexto de um ou mais **Ledgers** específicos. Essa abordagem garante que cada Ledger mantenha uma visão consistente e auditável do seu universo contábil.

As propriedades `code`, `number` e `exponent` são definidas **por ativo, por ledger**. Isso significa que um mesmo ativo (como "USD") pode ser declarado de forma independente em diferentes ledgers, com configurações específicas. No entanto, recomenda-se fortemente manter consistência entre os ambientes para evitar conflitos operacionais.
