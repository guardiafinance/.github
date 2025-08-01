---
sidebar_position: 3
keywords: [guardia core banking, transactional ledger, ledger as a service, modulo de ledger da guardia, assets, global assets, bound assets, ias-1, ias-8]
---

# Visão Geral dos Ativos (Assets)

Os Ativos no LKe (Ledger Kernel Engine) representam unidades de valor — monetárias ou não monetárias — utilizadas nos lançamentos contábeis. O sistema implementa uma arquitetura de dois níveis que combina flexibilidade operacional com integridade contábil.

## Arquitetura de Assets

### Global Assets
**Definições universais** que estabelecem padrões para ativos que podem ser utilizados em múltiplos contextos contábeis. Servem como templates que garantem consistência e facilitam reconciliações entre diferentes sistemas.

- Mantêm identidade comum e rastreável
- Definem denominações padronizadas
- Classificam ativos por tipo operacional (Fiat vs Non-Fiat)

### Bound Assets
**Especializações contextuais** de Global Assets dentro de Ledgers específicos. Permitem adaptações para necessidades operacionais, regulatórias ou técnicas específicas sem comprometer a rastreabilidade global.

- Sobrescrevem configurações específicas quando necessário
- Mantêm vínculo com o Global Asset original
- Garantem imutabilidade dos relacionamentos contábeis

## Fluxo de Utilização

```
Global Asset (USD)
       ↓
Bound Asset (USD no Ledger A)
       ↓
Book (Carteira do Cliente X)
       ↓
Entries (Lançamentos contábeis)
```

## Documentação Detalhada

### [Global Assets](./global-assets.md)
Especificação completa sobre definições universais de ativos, incluindo:
- Classificação operacional (Fiat vs Non-Fiat)
- Estrutura de denominação padronizada
- Guias práticos de classificação
- Exemplos de configuração

### [Bound Assets](./bound-assets.md)
Especificação sobre especialização contextual de ativos, abordando:
- Vinculação de assets a Ledgers específicos
- Relacionamentos com Books e Entries
- Garantias de integridade contábil
- Conformidade com normas IAS 1 e IAS 8

## Princípios Fundamentais

### Rastreabilidade Global
Toda utilização de ativo mantém vínculo com sua definição global, permitindo reconciliações e auditoria cross-ledger.

### Imutabilidade Contábil
Uma vez estabelecidos os relacionamentos entre Bound Assets, Books e Entries, eles são preservados para garantir integridade histórica.

### Especialização Controlada
Permite adaptações contextuais necessárias sem comprometer a identidade e consistência dos ativos globais.

### Conformidade Normativa
Alinhamento com princípios contábeis internacionais, especialmente IAS 1 (representação fiel) e IAS 8 (tratamento prospectivo).

## Referências Técnicas

- [Modelo de Domínio](../models/index.md)
- [Books - Instâncias de Uso](../books/index.md)
- [Especificações da API](../../api/lke/introducao)