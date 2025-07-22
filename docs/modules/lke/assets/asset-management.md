---
sidebar_position: 1
keywords: [guardia core banking, core bancario open source, core bancário escalável, ledger transacional, transações em tempo real]
---

# Atualização de Assets

Gerenciar Assets em um sistema contábil exige equilíbrio entre flexibilidade operacional e integridade histórica. Este documento define as regras aplicáveis às atualizações de Assets, considerando as exigências contábeis (IAS/IFRS), os impactos técnicos e a rastreabilidade regulatória.

## Atualizações e Integridade Contábil

No contexto da Guardia, um Asset representa uma unidade de valor — monetária ou não monetária — utilizada como base nos lançamentos contábeis registrados em um Ledger. Por essa razão, algumas de suas propriedades assumem papel estrutural na interpretação dos lançamentos, influenciando diretamente sua validade contábil e a reconciliação futura. Alterações nesses atributos após seu uso em transações podem comprometer a integridade do sistema e violar princípios contábeis fundamentais.

Especificamente, alterações na denominação de um asset — como `denomination.exponent`, `denomination.code` ou `denomination.number` — não devem refletir retroativamente nos Ledgers ativos (aqueles que já possuem transações). Ao vincular um asset a um ledger, por meio da criação de um `BoundAsset`, a denominação vigente é congelada e passa a representar fielmente todos os lançamentos naquele contexto. Qualquer alteração posterior na denominação do asset global terá efeito apenas prospectivo, aplicando-se apenas a novos vínculos com ledgers criados após a modificação. Essa abordagem preserva a consistência e integridade dos registros históricos, em conformidade com os princípios da IAS 1.15 (representação fiel).

Embora a IAS 8 trate da aplicação retrospectiva de mudanças em políticas contábeis e da correção de erros materiais, essas diretrizes não se aplicam à denominação de ativos no contexto do sistema. A alteração de atributos como `denomination.exponent` ou `denomination.code` ou `denomination.number` não configura uma mudança de política contábil, tampouco uma nova estimativa ou erro a ser corrigido — trata-se de uma reconfiguração técnica-operacional. Ademais, mesmo que tal alteração fosse considerada política contábil, sua reaplicação retroativa seria impraticável sem comprometer a integridade dos dados históricos. A própria IAS 8.25 reconhece essa limitação: *“if it is impracticable to determine the cumulative effect \[…] the entity shall adjust \[…] to apply the new accounting policy prospectively from the earliest date practicable.”* Portanto, qualquer alteração deve ser aplicada de forma prospectiva, preservando os BoundAssets anteriores e assegurando conformidade com os princípios da IAS 1 e IAS 8.

Diante disso, a atualização de um asset global deve preservar a integridade contábil dos ledgers que já o utilizam. A modelagem da Guardia segue o princípio de imutabilidade, no qual alterações realizadas em um asset não impactam retroativamente os `BoundAssets` existentes. Essas alterações terão efeito apenas prospectivo, sendo aplicáveis exclusivamente a novos vínculos com ledgers (ou seja, novos `BoundAssets`) criados após a atualização.

### Campos Críticos do Asset Global

São os campos que compõem a denominação do ativo e têm impacto direto na mensuração contábil. Por isso, sua alteração requer controles específicos:

* `denomination.code`: Código representativo (ex: "USD")
* `denomination.number`: Número ISO ou identificador (ex: "840")
* `denomination.exponent`: Escala decimal (ex: 2)

> NOTA: Esses campos **podem ser atualizados no asset global**, desde que os efeitos se restrinjam a novos `BoundAssets`. Ou seja, não há impacto retroativo nos ledgers ativos (aqueles com transações já registradas).

## Atualizações de BoundAssets

Um `BoundAsset` representa a instância de um asset dentro de um ledger. Ao ser criado, ele herda, ou pode sobrescrever, os atributos do asset global no momento da vinculação, e os congela a partir do momento que o ledger é ativado, assegurando estabilidade e rastreabilidade dentro do contexto contábil.

### Campos Críticos do BoundAsset

* `denomination.code`
* `denomination.number`
* `denomination.exponent`

> NOTA: Esses campos só poderão ser alterados enquanto o ledger estiver **inativo**, ou seja, **sem transações comitadas**. Após o primeiro uso em uma entry, os atributos do `BoundAsset` tornam-se imutáveis.

**Comportamento esperado em caso de tentativa de alteração em ledger ativo**

* HTTP Status: `422 Unprocessable Entity`
* Código de erro: `ERR422_BUSINESS_ERROR`
* Mensagem: `LEDGER_HAS_TRANSACTIONS`

**Exemplo de tentativa rejeitada**

```json
PUT /v1/ledgers/{ledger_identifier}/assets/{asset_identifier}
{
  "denomination": {
    "code": "BRL",
    "number": "968",
    "exponent": 4
  }
}
// Resultado
{
  "errors": [
    {
      "code": "ERR422_BUSINESS_ERROR",
      "reason": "LEDGER_HAS_TRANSACTIONS",
      "message": "This bound asset cannot be updated because the ledger already contains transactions."
    }
  ]
}
```

> IMPORTANTE: Para alterar os atributos de um `BoundAsset`, deve-se criar um novo `BoundAsset` com os atributos desejados, vincular este novo recurso ao ledger e, em seguida, descartar o vínculo anterior, se desejado. Esse procedimento está descrito na seção [Atualizações de BoundAssets](#atualizações-de-boundassets) e garante a imutabilidade dos parâmetros utilizados em lançamentos já realizados.

## Descarte de Assets

O descarte de um Asset global implica torná-lo indisponível para novos vínculos com ledgers. Essa operação não modifica nem invalida os vínculos ou registros já existentes, mas impede o uso do asset em futuras criações de `BoundAssets`.

### Regras para descarte de Asset global

- **Pode ser descartado**: mesmo que o asset esteja vinculado a Ledgers existentes (com ou sem transações).
- **Efeito do descarte**: impede a criação de novos `BoundAssets` a partir do asset descartado.

**Restrições**

- O sistema deve impedir apenas novas vinculações (não o uso retroativo).

- Nenhuma modificação é feita nos `BoundAssets` existentes.

**Exemplo de descarte permitido**

```json
DELETE /v1/assets/{asset_identifier}
// Resultado: 204 No Content
// Efeito: asset é marcado como descartado; vínculos existentes permanecem válidos
```

## Descarte de BoundAssets

O descarte de um `BoundAsset` representa a desativação de um vínculo específico entre um asset e um ledger. Após descartado, o `BoundAsset` não poderá mais ser utilizado para criação de books ou registros contábeis.

### Regras para descarte de BoundAsset

- **Pode ser descartado fisicamente**: se, e somente se, o `BoundAsset` **não tiver sido utilizado** em nenhuma lançamento contábil.
- **Pode ser descartado logicamente**: quando o `BoundAsset` **tiver sido utilizado** em nenhuma lançamento contábil.
- **Efeito do descarte**: impede a criação de novos `Books` a partir do `BoundAsset` descartado.

## Referências

- [IAS 1 – Apresentação das Demonstrações Contábeis](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8 – Políticas Contábeis, Mudanças de Estimativas e Erros](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2024/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
