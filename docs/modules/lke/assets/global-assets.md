---
sidebar_position: 1
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, global assets, classificação de ativos, fiat, non-fiat]
---

# Ativos Globais (Global Assets)

Ativos Globais representam definições universais de unidades de valor — monetárias ou não monetárias — que servem como padrão para criação de representações específicas dentro de diferentes contextos contábeis (Ledgers).

Eles estabelecem uma identidade comum e rastreável para assets que podem ser utilizados em múltiplos ledgers, garantindo consistência operacional e facilitando reconciliações entre diferentes sistemas contábeis.

## Classificação Operacional: Fiat vs. Non-Fiat

Assets podem ser classificados, para fins operacionais, em dois tipos principais baseados na natureza de seu lastro e forma de liquidação:

### Ativos Fiduciários (Fiat)

Representações digitais de unidades monetárias fiduciárias ou instrumentos financeiros com direito contratual a fluxos de caixa. Incluem:

- **Moedas soberanas**: Denominadas em códigos ISO 4217 como Real Brasileiro (BRL), Dólar Americano (USD) ou Euro (EUR)
- **Instrumentos patrimoniais**: Ações ordinárias e preferenciais que representam participação societária
- **Instrumentos de dívida**: Debêntures, bonds, CDB e outros títulos com direito de recebimento futuro
- **Commodities tokenizadas com liquidação financeira**: Tokens que resultam em pagamentos em moeda fiduciária

### Ativos Não-Fiduciários (Non-Fiat)

Representações digitais de criptomoedas ou ativos tokenizados não financeiros, sem direito contratual direto a fluxos de caixa em moeda fiduciária. Incluem:

- **Criptomoedas puras**: Bitcoin (BTC), Ethereum (ETH), Ripple (XRP) e outras moedas descentralizadas
- **Bens físicos tokenizados**: Imóveis, terrenos e outros ativos tangíveis representados digitalmente
- **Commodities físicas**: Ouro, petróleo, café negociados fisicamente
- **Certificados ambientais**: Créditos de carbono e outros instrumentos de valor ambiental

> NOTA: A classificação IFRS depende do que o contrato realmente representa em termos econômicos — ou seja, da essência da operação e dos efeitos reais que ela gera, mesmo que a forma legal diga outra coisa. Esse princípio, chamado de substance over form (IAS 1, par. 15), garante que a contabilidade mostre com fidelidade os direitos e obrigações de fato existentes.

## Guia de Classificação Prática

| Tipo de Ativo                                   | Exemplo                         | Classificação IFRS              | Classificação Operacional | Descrição                                                         |
| ----------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| Dinheiro em espécie ou digital estatal          | BRL, USD, EUR                   | Ativo Financeiro                | **Fiat**                  | Representa dinheiro físico ou digital oficial de um governo       |
| Instrumento patrimonial                         | Ações ordinárias, preferenciais | Ativo Financeiro                | **Fiat**                  | Representa participação no capital de outra entidade              |
| Instrumento de dívida                           | Debêntures, bonds, CDB          | Ativo Financeiro                | **Fiat**                  | Título que dá direito a receber dinheiro no futuro                |
| Commodity tokenizada com liquidação em dinheiro | Token de ouro em USD            | Ativo Financeiro (Derivativo)   | **Fiat**                  | Contrato que resulta em pagamento financeiro                      |
| Criptomoedas puras                              | BTC, ETH, XRP                   | **Não Financeiro** (geralmente) | **Non-Fiat**              | Ativos digitais descentralizados, sem direito contratual de caixa |
| Bem físico                                      | Imóvel, terreno                 | Ativo Não Financeiro            | **Non-Fiat**              | Ativo tangível não vinculado diretamente a contrato financeiro    |
| Token de imóvel                                 | Token representando imóvel      | Depende do contrato             | **Non-Fiat**              | Pode virar "Fiat" se houver liquidação em dinheiro                |
| Commodity física                                | Ouro, petróleo, café            | Ativo Não Financeiro            | **Non-Fiat**              | Bem negociável fisicamente, sem contrato financeiro por si só     |
| Crédito de carbono                              | Certificado de emissão          | Ativo Não Financeiro            | **Non-Fiat**              | Unidade de valor ambiental, sem contrato de liquidação financeira |

## Estrutura de Denominação

Todo Global Asset possui uma denominação padronizada que define sua identificação e representação operacional. A denominação é composta pelos seguintes elementos:

### Propriedades da Denominação

| Campo       | Descrição                                                                                                                                                                    | Exemplo       |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `code`      | Identificador alfanumérico do ativo, baseado em códigos ISO 4217 para moedas fiduciárias ou código arbitrário para outros assets                                          | USD, BTC, GRD1 |
| `number`    | Identificador numérico do ativo, geralmente baseado no padrão ISO 4217 para moedas fiduciárias                                                                             | 840 (USD)     |
| `exponent`  | Número de casas decimais utilizadas para representar a menor fração do ativo                                                                                                | 2 (centavos)  |

### Exemplos de Denominação

**Dólar Americano:**
```json
{
  "code": "USD",
  "number": 840,
  "exponent": 2
}
```

**Real Brasileiro:**
```json
{
  "code": "BRL", 
  "number": 986,
  "exponent": 2
}
```

**Bitcoin:**
```json
{
  "code": "BTC",
  "number": null,
  "exponent": 8
}
```

## Referências

- [Modelo de Domínio - Asset](../models/index.md#asset)
- [Bound Assets - Especialização de Contexto](./bound-assets.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)