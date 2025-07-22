---
sidebar_position: 4
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, books, ias-1, ias-2, ias-38, ifrs-9]
---

# Book

Um **Book** é uma **unidade contábil independente**, usada para registrar o histórico de movimentações (`entries`) relacionadas a um determinado ativo, passivo, receita, despesa ou patrimônio. Ele é a menor célula rastreável de mensuração contábil dentro do ledger.

Cada Book é sempre associado a um **BoundAsset**, que por sua vez representa uma **unidade de valor** — monetária ou não monetária — garantindo consistência na mensuração e segregação por tipo de valor.

**Benefícios do uso de Books:**

* **Auditabilidade nativa** com versionamento e validade temporal
* **Segregação clara entre domínios financeiros e operacionais**
* **Flexibilidade para representar ativos digitais e não convencionais**
* **Compliance com IAS/IFRS**, mantendo integridade e rastreabilidade
* **Base para reconciliações, fechamentos e relatórios contábeis**

## Estrutura do Book

Abaixo estão os principais campos que compõem a estrutura de um Book:

| Campo                | Descrição                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `entity_id`          | Campo controlado pela aplicação. UUID v7, com ordenação temporal.                               |
| `external_entity_id` | Identificador único para interoperabilidade com outros sistemas. Tamanho máximo: 36 caracteres. |
| `name`               | Nome único dentro do ledger. Tamanho máximo: 128 caracteres.                                    |
| `position`           | Posição de saldo do Book.                                          |
| `nature`             | Natureza do book. Deve ser CREDITOR ou DEBITOR.                                                 |
| `ledger`             | Identificador do ledger ao qual o book está associado.                                            |
| `chapters`           | Identificadores dos chapters ao qual o book está associado.                                      |
| `entries`            | Identificadores dos entries ao qual o book está associado.                                       |
| `created_at`         | Data de inserção no banco de dados.                                                             |
| `updated_at`         | Data da última atualização no banco de dados.                                                   |
| `discarded_at`       | Data de exclusão no banco de dados. Deve implementar padrão de exclusão suave.                  |
| `metadata`           | Informações adicionais sobre o book, que podem incluir descrição, tags, entre outros dados externos. |

## Natureza Contábil

Cada Book possui uma **natureza contábil**, que define o comportamento esperado do seu saldo:

### Natureza Devedora (`DEBITOR`)

* O saldo **aumenta com lançamentos a débito** e **diminui com lançamentos a crédito**
* Representa ativos, despesas ou aplicações financeiras
* Comum em books de lastro, investimentos e ativos patrimoniais

**Exemplos:**

* Conta bancária da fintech (lastro dos clientes)
* Investimento em CDB
* Ativo imobilizado (ex: veículo, imóvel)
* Despesas operacionais

### Natureza Credora (`CREDITOR`)

* O saldo **aumenta com lançamentos a crédito** e **diminui com lançamentos a débito**
* Representa passivos, receitas ou obrigações
* Comum em books de saldo de clientes, tributos a pagar e contas de receita

**Exemplos:**

* Saldo de conta do cliente (passivo)
* Receita de tarifas ou juros
* Obrigações tributárias
* Cashback a pagar

> *Nota:* em outras literaturas, essas naturezas também podem ser referenciadas como `normal balance` ou `account nature`.

## Aplicações Práticas

A modelagem de Books permite representar ativos e passivos com alta granularidade, flexibilidade e rastreabilidade:

**Financeiros:**

* Conta Corrente
* Conta de Investimento
* Wallet de Criptomoeda
* Saldo de Cashback
* Provisão de Tributos
* Contas a Pagar/Receber

**Não Financeiros:**

* Book de um Imóvel ou Veículo
* Créditos de Carbono
* Pontos de Fidelidade
* Energia Gerada ou Consumida
* NFTs ou Tokens

## Considerações Finais

A estrutura do **Book** foi concebida como uma base contábil sólida e programável, capaz de representar desde ativos financeiros tradicionais até unidades de valor não convencionais. Combinando flexibilidade operacional e aderência a normas contábeis internacionais, o modelo viabiliza rastreabilidade, governança e compatibilidade com ecossistemas globais desde sua origem. Para entender os princípios contábeis e normativos que sustentam essa arquitetura, consulte a [Fundamentação Técnica do Book](./foundation.md).
