---
sidebar_position: 0
---

import MermaidDiagram from '@site/src/components/MermaidDiagram';

# Entities and Relationships

## Control Schema

The control schema is the schema that contains the references of all other schemas.

<MermaidDiagram>
```mermaid
erDiagram
    %%{init: {'theme': 'neutral'}}%%

    LEDGER ||--o{ LEDGER_HISTORY : tracks

    LEDGER {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        string name "Unique within the organization and tenant. Maximum length: 128 characters."
        string description "Description for reporting purposes. Maximum length: 256 characters."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    LEDGER_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        string name "Unique within the organization and tenant. Maximum length: 128 characters."
        string description "Description for reporting purposes. Maximum length: 256 characters."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    ASSET ||--o{ ASSET_HISTORY : tracks
    ASSET {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        string classification "Asset classification. Must be FIAT or NON_FIAT."
        string denomination_code "Representative code of the asset. Must be an ISO 4217 code."
        string denomination_number "ISO number or identifier of the asset. Must be an ISO 4217 number."
        int denomination_exponent "Decimal scale of the asset. Must be an integer between 0 and 18."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    ASSET_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        string classification "Asset classification. Must be FIAT or NON_FIAT."
        string denomination_code "Representative code of the asset. Must be an ISO 4217 code."
        string denomination_number "ISO number or identifier of the asset. Must be an ISO 4217 number."
        int denomination_exponent "Decimal scale of the asset. Must be an integer between 0 and 18."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    LEDGER ||--o{ BOUND_ASSET : has
    ASSET ||--o{ BOUND_ASSET : has
    BOUND_ASSET ||--o{ BOUND_ASSET_HISTORY : tracks
    BOUND_ASSET {
        uuid ledger_entity_id FK "Reference to LEDGER."
        uuid asset_entity_id FK "Relationship with ASSET."
        string denomination_code "Representative code of the asset. Must be an ISO 4217 code."
        string denomination_number "ISO number or identifier of the asset. Must be an ISO 4217 number."
        int denomination_exponent "Decimal scale of the asset. Must be an integer between 0 and 18."
        array denomination_locations "Regions where the asset is accepted as currency. Must be an array of ISO 3166-2 codes."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    BOUND_ASSET_HISTORY {
        uuid ledger_entity_id FK "Reference to LEDGER."
        uuid asset_entity_id FK "Relationship with ASSET."
        string denomination_code "Representative code of the asset. Must be an ISO 4217 code."
        string denomination_number "ISO number or identifier of the asset. Must be an ISO 4217 number."
        int denomination_exponent "Decimal scale of the asset. Must be an integer between 0 and 18."
        array denomination_locations "Regions where the asset is accepted as currency. Must be an array of ISO 3166-2 codes."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

```
</MermaidDiagram>

## General Schema

The general schema is the central ledger schema used in the triple-entry system. In this schema, the temporal records of transactions, entries, and positions are recorded in triple-entry format.

<MermaidDiagram>
```mermaid
erDiagram
    %%{init: {'theme': 'neutral'}}%%

    CHAPTER {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        string name "Unique within the ledger. Maximum length: 128 characters."
        string description "Description for reporting purposes. Maximum length: 256 characters."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    BOOK ||--o{ ENTRY : contains
    BOOK ||--|| POSITION : has
    BOOK ||--o{ CHAPTER : references
    BOOK {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        uuid chapter_id FK "Relationship with CHAPTER."
        uuid position_id FK "Relationship with POSITION."
        string name "Unique within the ledger. Maximum length: 128 characters."
        enum nature "Book nature. Must be CREDITOR or DEBITOR."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    POSITION {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        uuid book_id FK "Relationship with BOOK."
        uuid asset_id "Reference to ASSET."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        bigint posted_amount "Amount posted in the position."
        bigint posted_credits "Credits posted in the position."
        bigint posted_debits "Debits posted in the position."
        bigint confirmable_amount "Amount to be confirmed in the position."
        bigint confirmable_credits "Credits to be confirmed in the position."
        bigint confirmable_debits "Debits to be confirmed in the position."
        bigint provisioned_amount "Provisioned amount in the position."
        bigint provisioned_credits "Provisioned credits in the position."
        bigint provisioned_debits "Provisioned debits in the position."
        bigint available_amount "Available amount in the position."
        bigint available_credits "Available credits in the position."
        bigint available_debits "Available debits in the position."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    ENTRY }o--|| TRANSACTION : belongs_to
    ENTRY ||--|| POSITION : references
    ENTRY ||--|| BOOK : references
    ENTRY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid transaction_id FK "Relationship with TRANSACTION."
        uuid position_id FK "Relationship with POSITION."
        uuid book_id FK "Relationship with BOOK."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum direction "Entry direction. Must be CREDIT or DEBIT."
        enum status "Entry status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    TRANSACTION ||--o| TRANSACTION : reverses
    TRANSACTION {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum status "Transaction status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

```
</MermaidDiagram>

## Transactional Schema

Each ledger is associated with a transactional schema. In addition to the temporal record of each entity, the transactional schema records the history of each entity.

<MermaidDiagram>
```mermaid
erDiagram
    %%{init: {'theme': 'neutral'}}%%

    CHAPTER ||--o{ CHAPTER_HISTORY : tracks
    CHAPTER {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        string name "Unique within the ledger. Maximum length: 128 characters."
        string description "Description for reporting purposes. Maximum length: 256 characters."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    CHAPTER_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        string name "Unique within the ledger. Maximum length: 128 characters."
        string description "Description for reporting purposes. Maximum length: 256 characters."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    BOOK ||--o{ ENTRY : contains
    BOOK ||--|| POSITION : has
    BOOK ||--o{ CHAPTER : references
    BOOK ||--o{ BOOK_HISTORY : tracks
    BOOK {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        uuid chapter_id FK "Relationship with CHAPTER."
        uuid position_id FK "Relationship with POSITION."
        string name "Unique within the ledger. Maximum length: 128 characters."
        enum nature "Book nature. Must be CREDITOR or DEBITOR."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    BOOK_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        uuid chapter_id FK "Relationship with CHAPTER."
        uuid position_id FK "Relationship with POSITION."
        string name "Unique within the ledger. Maximum length: 128 characters."
        enum nature "Book nature. Must be CREDITOR or DEBITOR."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    POSITION ||--o{ POSITION_HISTORY : tracks
    POSITION {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        uuid book_id FK "Relationship with BOOK."
        uuid asset_id "Reference to ASSET."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        bigint posted_amount "Amount posted in the position."
        bigint posted_credits "Credits posted in the position."
        bigint posted_debits "Debits posted in the position."
        bigint confirmable_amount "Amount to be confirmed in the position."
        bigint confirmable_credits "Credits to be confirmed in the position."
        bigint confirmable_debits "Debits to be confirmed in the position."
        bigint provisioned_amount "Provisioned amount in the position."
        bigint provisioned_credits "Provisioned credits in the position."
        bigint provisioned_debits "Provisioned debits in the position."
        bigint available_amount "Available amount in the position."
        bigint available_credits "Available credits in the position."
        bigint available_debits "Available debits in the position."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    POSITION_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid book_id FK "Relationship with BOOK."
        uuid asset_id FK "Relationship with ASSET."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        bigint posted_amount "Total amount posted in the position."
        bigint posted_credits "Total credits posted in the position."
        bigint posted_debits "Total debits posted in the position."
        bigint confirmable_amount "Total amount to be confirmed in the position."
        bigint confirmable_credits "Total credits to be confirmed in the position."
        bigint confirmable_debits "Total debits to be confirmed in the position."
        bigint provisioned_amount "Total provisioned amount (posted and confirmed) in the position."
        bigint provisioned_credits "Total provisioned credits (posted and confirmed) in the position."
        bigint provisioned_debits "Total provisioned debits in the position."
        bigint available_amount "Total available amount in the position."
        bigint available_credits "Total available credits in the position."
        bigint available_debits "Total available debits in the position."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp discarded_at "Date of deletion in the database. Must implement soft delete standard."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    ENTRY }o--|| TRANSACTION : belongs_to
    ENTRY ||--|| POSITION : references
    ENTRY ||--|| BOOK : references
    ENTRY ||--o{ ENTRY_HISTORY : tracks
    ENTRY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid transaction_id FK "Relationship with TRANSACTION."
        uuid position_id FK "Relationship with POSITION."
        uuid book_id FK "Relationship with BOOK."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum direction "Entry direction. Must be CREDIT or DEBIT."
        enum status "Entry status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    ENTRY_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid transaction_id FK "Relationship with TRANSACTION."
        uuid position_id FK "Relationship with POSITION."
        uuid book_id FK "Relationship with BOOK."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum direction "Entry direction. Must be CREDIT or DEBIT."
        enum status "Entry status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }

    TRANSACTION ||--o| TRANSACTION : reverses
    TRANSACTION ||--o{ TRANSACTION_HISTORY : tracks
    TRANSACTION {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum status "Transaction status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version. Default: 12/31/9999 23:59:59."
    }

    TRANSACTION_HISTORY {
        uuid entity_id PK "Field controlled by the application. UUID v7, with temporal ordering."
        string external_entity_id "Unique identifier for interoperability with other systems. Maximum length: 36 characters."
        uuid ledger_id "Reference to LEDGER."
        timestamp reference_at "Transaction reference timestamp. If not provided, it will be the database insertion date."
        enum status "Transaction status. Must be PENDING, POSTED, or DISCARDED."
        timestamp created_at "Date of insertion into the database."
        timestamp updated_at "Date of last update in the database."
        timestamp posted_at "Date of posting in the ledger."
        timestamp discarded_at "Date of deletion in the ledger. Must implement soft delete standard."
        hstore metadata "Additional metadata for interoperability with other systems. Maximum size: 4KB."
        int version "Field controlled by the application. Must be incremented by 1 each time the entity is changed."
        timestampz valid_from "Field indicating the start of the validity period of this entity version."
        timestampz valid_to "Field indicating the end of the validity period of this entity version."
    }
```
</MermaidDiagram>
