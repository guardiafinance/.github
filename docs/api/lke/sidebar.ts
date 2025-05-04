import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/lke/introducao",
    },
    {
      type: "category",
      label: "Ledgers",
      link: {
        type: "doc",
        id: "api/lke/ledgers",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/create-ledger",
          label: "Cria um novo ledger",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/lke/list-ledgers",
          label: "Lista todos os ledgers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/get-ledger",
          label: "Obtém um ledger específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/update-ledger",
          label: "Atualize os dados de um ledger específico",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/lke/delete-ledger",
          label: "Exclui um ledger específico",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Chapters",
      link: {
        type: "doc",
        id: "api/lke/chapters",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/create-chapter",
          label: "Cria um novo chapter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/lke/list-chapters",
          label: "Lista todos os chapters",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/get-chapter",
          label: "Obtém um chapter específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/update-chapter",
          label: "Atualiza um chapter específico",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/lke/delete-chapter",
          label: "Exclui um chapter específico",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Assets",
      link: {
        type: "doc",
        id: "api/lke/assets",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/create-asset",
          label: "Criar um novo asset",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/lke/list-assets",
          label: "Lista todos os assets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/get-asset",
          label: "Obtém um asset específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/lke/update-asset",
          label: "Atualiza um asset específico",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/lke/delete-asset",
          label: "Exclui um asset específico",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/lke/schemas/uuidv-7",
          label: "UUIDv7",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/externalentityid",
          label: "ExternalEntityID",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/version",
          label: "Version",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/datetime",
          label: "DateTime",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/metadata",
          label: "Metadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledger",
          label: "Ledger",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/listofledgers",
          label: "ListOfLedgers",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/pagination",
          label: "Pagination",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/error",
          label: "Error",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/errors",
          label: "Errors",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/errorsresponse",
          label: "ErrorsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledgercreaterequest",
          label: "LedgerCreateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/ledgerupdaterequest",
          label: "LedgerUpdateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chapter",
          label: "Chapter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/listofchapters",
          label: "ListOfChapters",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chaptercreaterequest",
          label: "ChapterCreateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/chapterupdaterequest",
          label: "ChapterUpdateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/asset",
          label: "Asset",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/listofassets",
          label: "ListOfAssets",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/assetupdaterequest",
          label: "AssetUpdateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/uuid",
          label: "UUID",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/uuidv-7",
          label: "UUIDv7",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/debug",
          label: "Debug",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/lke/schemas/assetcreaterequest",
          label: "AssetCreateRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
