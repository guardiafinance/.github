---
sidebar_position: 2
keywords: [guardia core banking, transactional ledger, ledger as a service, bound assets, asset binding, contextualização de ativos, ias-1, ias-8]
---

# Ativos Vinculados (Bound Assets)

Bound Assets representam a especialização contextual de Global Assets dentro de Ledgers específicos. Eles permitem que um mesmo ativo global seja configurado de forma diferenciada para atender às necessidades operacionais, regulatórias ou técnicas de cada contexto contábil.

Esta abordagem garante flexibilidade operacional sem comprometer a rastreabilidade global dos ativos, possibilitando configurações específicas como alteração de expoentes, códigos ou metadados conforme as exigências de cada Ledger.

## Propósito e Contextualização

### Por Que Bound Assets São Necessários

A vinculação contextual resolve desafios operacionais comuns em sistemas multi-ledger:

- **Adaptação regulatória**: Diferentes jurisdições podem exigir representações distintas do mesmo ativo
- **Precisão operacional**: Sistemas legados podem ter limitações técnicas específicas (ex: apenas valores inteiros)
- **Conformidade contábil**: Alinhado com IAS 1 (par. 15–17), garante representação fiel dos fenômenos econômicos
- **Auditabilidade**: Manutenção de trilhas claras entre configuração global e uso contextual

### Especialização da Denominação

Quando um Global Asset é vinculado a um Ledger, é possível **sobrescrever seletivamente** elementos de sua denominação original:

**Exemplo Prático:**
- **Global Asset USD**: `exponent = 2` (padrão: centavos)
- **Bound Asset USD no Ledger A**: `exponent = 2` (mantém configuração global)
- **Bound Asset USD no Ledger B**: `exponent = 0` (apenas valores inteiros por limitação sistêmica)

Esta flexibilidade permite que o mesmo ativo global seja usado em diferentes contextos sem conflitos operacionais.

## Relacionamentos e Integridade Contábil

### Relação Bound Asset → Book

A criação de Books (carteiras) segue princípios rigorosos de imutabilidade para garantir integridade histórica:

#### Regras Fundamentais

- **Vinculação única**: Um Book é **SEMPRE** criado com base em um Bound Asset específico
- **Herança no momento da criação**: Toda configuração do Bound Asset (denominação, expoente, metadados) é **herdada e fixada** no momento da criação do Book
- **Imutabilidade**: Após criado, um Book **NÃO PODE** ser reatribuído a outro Bound Asset

#### Tratamento de Alterações

Quando há necessidade de modificar configurações de um Bound Asset:

1. **Criação de nova versão**: Deve-se criar um novo Bound Asset com as configurações atualizadas
2. **Books futuros**: Novos Books devem referenciar o Bound Asset atualizado
3. **Books existentes**: Permanecem vinculados à configuração original, preservando histórico contábil

```
Global Asset: USD
│
├── Ledger A: Bound Asset (exponent: 2)
│   ├── Book A
│   └── Book B
│
└── Ledger B: Bound Asset (exponent: 0) 
    ├── Book C
    └── Book D
```

### Relação Bound Asset → Entry (via Book)

As Entries (lançamentos contábeis) herdam o contexto do Bound Asset **indiretamente**, através do Book:

#### Fluxo de Herança Contextual

1. **Bound Asset** define configuração específica do ativo no Ledger
2. **Book** herda e congela essas configurações no momento da criação
3. **Entry** utiliza as configurações congeladas do Book para seus lançamentos

#### Garantias de Integridade

- **Representação fiel**: Cada Entry reflete exatamente as configurações vigentes quando o Book foi criado
- **Imutabilidade histórica**: Alterações posteriores no Bound Asset não afetam Entries já criadas
- **Consistência contábil**: Todos os lançamentos de um Book mantêm a mesma representação do ativo

## Conformidade Normativa

### Alinhamento com IAS 1 (Representação Fiel)

A modelagem de Bound Assets assegura **representação fiel** dos eventos contábeis:

- **Precisão contextual**: Cada Ledger pode configurar assets conforme suas necessidades específicas
- **Transparência**: A origem global do ativo permanece rastreável
- **Consistência**: Configurações são aplicadas uniformemente dentro de cada contexto

### Alinhamento com IAS 8 (Tratamento Prospectivo)

O tratamento de alterações segue o princípio prospectivo:

- **Efeito futuro**: Alterações em Bound Assets afetam apenas operações futuras
- **Preservação histórica**: Registros anteriores mantêm sua representação original
- **Documentação**: Cada versão de Bound Asset mantém trilha de auditoria

## Quando Usar Bound Assets

### Cenários Recomendados

- **Multi-jurisdição**: Quando o mesmo ativo precisa ser representado diferentemente em jurisdições distintas
- **Sistemas heterogêneos**: Quando diferentes Ledgers têm limitações técnicas específicas
- **Conformidade específica**: Quando regulamentações locais exigem configurações particulares
- **Evolução controlada**: Quando configurações de assets precisam evoluir mantendo histórico íntegro

### Quando Considerar Alternativas

- **Contexto único**: Se o ativo será usado apenas em um Ledger específico, considere definir diretamente como Global Asset
- **Configuração volátil**: Para assets com configurações que mudam frequentemente, avalie se o overhead de versionamento compensa

## Comportamentos Esperados

### Criação de Bound Asset

```http
POST /ledgers/{ledger-id}/assets
Content-Type: application/json

{
  "global_asset_id": "usd-global-v1",
  "denomination": {
    "code": "USD",
    "exponent": 0  // Sobrescreve o exponent global (2)
  }
}
```

### Herança Automática

- **Campos não especificados**: Herdam automaticamente do Global Asset
- **Campos especificados**: Sobrescrevem a configuração global
- **Rastreabilidade**: Link para o Global Asset é sempre mantido

### Versionamento Transparente

- **IDs únicos**: Cada versão de Bound Asset recebe identificador exclusivo
- **Metadata de versionamento**: Timestamps e referências para auditoria
- **Backward compatibility**: Books antigos continuam funcionando normalmente

## Limitações e Restrições

- **Imutabilidade de Books**: Uma vez ativado, isto e, recebeu seu primeiro lancamento, um Book não pode ser reatribuído
- **Propagação unidirecional**: Alterações em Global Assets não se propagam automaticamente para Bound Assets
- **Overhead operacional**: Cada alteração requer criação de nova versão

## Referências

- [Global Assets - Definições Universais](./global-assets.md)
- [Modelo de Domínio - Bound Asset](../models/index.md#boundasset)
- [Books](../books/index.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8: Accounting Policies, Changes in Accounting Estimates and Errors](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 21: The Effects of Changes in Foreign Exchange Rates](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-21-the-effects-of-changes-in-foreign-exchange-rates.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)
