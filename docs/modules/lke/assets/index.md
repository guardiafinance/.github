---
sidebar_position: 3
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, assets, ias-1, ias-8]
---

# Ativos (Assets)

Ativos representam unidades de valor — monetárias ou não monetárias — utilizadas nos lançamentos contábeis dentro de um Ledger. Eles podem ser classificados, para fins operacionais, em dois tipos principais:

- **Fiduciários (Fiat)**: Representações digitais de unidades monetárias fiduciárias, denominadas em moedas como Real Brasileiro (BRL), Dólar Americano (USD) ou Euro (EUR), entre outras com código ISO 4217. Use Fiat para representar qualquer ativo regido por contrato financeiro ou denominado em moeda fiduciária;

- **Não-Fiduciários (Non-Fiat)**: Representações digitais de criptomoedas (como Bitcoin (BTC), Ethereum (ETH), Ripple (XRP)) ou de ativos tokenizados não financeiros, como imóveis, créditos de carbono ou outros bens físicos não sujeitos a liquidação financeira contratual.Use Non-Fiat para ativos sem contrato financeiro direto — como criptomoedas puras, imóveis físicos e ativos tokenizados sem liquidação financeira.


## Classificação de Ativos: Fiat vs. Non-Fiat (Guia Prático)

| Tipo de Ativo                                   | Exemplo                         | Classificação IFRS              | Classificação Fiduciária | Descrição Didática                                                |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ----------------- | ----------------------------------------------------------------- |
| Dinheiro em espécie ou digital estatal          | BRL, USD, EUR                   | Ativo Financeiro                | **Fiat**          | Representa dinheiro físico ou digital oficial de um governo       |
| Instrumento patrimonial                         | Ações ordinárias, preferenciais | Ativo Financeiro                | **Fiat**          | Representa participação no capital de outra entidade              |
| Instrumento de dívida                           | Debêntures, bonds, CDB          | Ativo Financeiro                | **Fiat**          | Título que dá direito a receber dinheiro no futuro                |
| Commodity tokenizada com liquidação em dinheiro | Token de ouro em USD            | Ativo Financeiro (Derivativo)   | **Fiat**          | Contrato que resulta em pagamento financeiro                      |
| Criptomoedas puras                              | BTC, ETH, XRP                   | **Não Financeiro** (geralmente) | **Non-Fiat**      | Ativos digitais descentralizados, sem direito contratual de caixa |
| Bem físico                                      | Imóvel, terreno                 | Ativo Não Financeiro            | **Non-Fiat**      | Ativo tangível não vinculado diretamente a contrato financeiro    |
| Token de imóvel                                 | Token representando imóvel      | Depende do contrato             | **Non-Fiat**      | Pode virar “Fiat” se houver liquidação em dinheiro                |
| Commodity física                                | Ouro, petróleo, café            | Ativo Não Financeiro            | **Non-Fiat**      | Bem negociável fisicamente, sem contrato financeiro por si só     |
| Crédito de carbono                              | Certificado de emissão          | Ativo Não Financeiro            | **Non-Fiat**      | Unidade de valor ambiental, sem contrato de liquidação financeira |


## Denominação do Ativo

Cada ativo possui uma denominação, que é um objeto com as seguintes propriedades:

| Campo       | Descrição |
|-------------|-----------|
| `code`      | Identificador alfanumérico do ativo, que pode ser baseado em códigos ISO 4217 para moedas fiduciárias (ex: USD para dólar, BRL para real) ou pode ser um código arbitrário (ex: GRD1 para a versão 1 do Guardia Token). |
| `number`    | Identificador numérico do ativo, geralmente baseado no padrão ISO 4217 para moedas fiduciárias (ex: "840" para USD). |
| `exponent`  | Define o número de casas decimais utilizadas para representar a menor fração do ativo (ex: 2 para centavos em USD — ou seja, 1 USD = 100 cents). |
| `locations` | Lista de países em que o ativo é aceito. |

Para mais detalhes sobre as propriedades do ativo, consulte a seção [Modelo de Domínio](../models/index.md#asset).

## Relacionamentos e Efeitos Normativos

### Relação Asset/Ledger (BoundAsset)

Os ativos são declarados e versionados no contexto de um ou mais `Ledgers` por meio da entidade intermediária `BoundAsset`. Essa modelagem garante que cada `Ledger` mantenha uma configuração isolada, rastreável e auditável dos ativos utilizados em seus lançamentos contábeis.

A **denominação** de um asset — composta por propriedades como `code`, `number` e `exponent` — define como esse ativo é identificado, convertido e apresentado operacionalmente. Essa denominação é inicialmente estabelecida no escopo do `Asset`, representando sua forma **global e genérica** no sistema.

Entretanto, ao vincular um `Asset` a um `Ledger` por meio de um `BoundAsset`, é possível **sobrescrever a denominação original** com configurações específicas para aquele contexto contábil. Essa capacidade de especialização permite adaptar a representação do ativo às **exigências operacionais, regulatórias ou técnicas** de cada ledger.

Por exemplo, o asset global "USD" pode ter como denominação padrão `exponent = 2`, mas ser configurado com `exponent = 0` em um ledger que opera exclusivamente com valores inteiros por restrições sistêmicas.

> NOTA: Essa modelagem garante **precisão contábil no contexto local** (por ledger), sem comprometer a identidade nem a rastreabilidade do asset global. Além disso, assegura conformidade com o princípio de **representação fiel**, conforme a **IAS 1**.

### Relação BoundAsset/Book

Um `Book` representa a instância de uso de um `BoundAsset` por um cliente ou entidade dentro de um `Ledger`. Esse vínculo é **imutável e persistente**, garantindo rastreabilidade histórica e integridade dos registros.

* Um `Book` **sempre é criado com base em um** `BoundAsset` **específico**;
* Toda a configuração do asset (como `exponent`) utilizada no `Book` é **herdada no momento da criação**;
* Após criado, o `Book` **não pode ser reatribuído a outro `BoundAsset`**, mesmo que o asset original seja atualizado ou descontinuado.

> NOTA: Em caso de necessidade de alteração no `BoundAsset` (como ajuste no expoente), deve-se criar um novo `BoundAsset`, e a partir dele, novos `Books` destinados às operações futuras.

### Relação BoundAsset/Entry

As `Entries` (lançamentos contábeis) representam os registros efetivos de movimentação dentro de um `Ledger`. Elas são **associadas indiretamente a um** `BoundAsset`, por meio do `Book` ao qual pertencem.

* Cada `Entry` **herda o contexto contábil do** `BoundAsset` vigente no `Book` no momento do lançamento;
* Isso garante que os valores sejam registrados com o `exponent` e `code` corretos;
* Após criada, a `Entry` **não pode refletir alterações posteriores no** `BoundAsset`, preservando a representação fiel do evento original.

> NOTA: Esse comportamento está em conformidade com os princípios da **IAS 1 (representação fiel)** e da **IAS 8 (tratamento prospectivo de alterações contábeis)**.
