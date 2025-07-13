---
sidebar_position: 5
---

# Autenticação e Autorização

A plataforma Guardia adota modelos robustos de autenticação e autorização para garantir segurança, rastreabilidade e conformidade regulatória no acesso às suas APIs. Os mecanismos variam conforme o tipo de API, mas seguem um padrão comum baseado em **OAuth 2.0** e nos princípios do modelo **AAA (Triple A)**.

## Modelo AAA (Triple A)

O modelo AAA organiza o controle de acesso em três componentes essenciais:

- **Authentication (Autenticação):** Verifica a identidade de usuários ou sistemas por meio de credenciais como senhas, certificados ou tokens.
- **Authorization (Autorização):** Define as permissões da identidade autenticada com base em políticas e escopos.
- **Accounting (Responsabilização):** Registra as ações realizadas — como acessos e uso de recursos — permitindo auditoria e prestação de contas.

Esse modelo sustenta os pilares de segurança e governança da plataforma e orienta a implementação dos fluxos de autenticação.

## OAuth 2.0

**OAuth 2.0** é o protocolo adotado pela Guardia como padrão para autenticação e autorização entre sistemas. Ele permite controlar o acesso de forma segura e escalável, por meio de tokens emitidos por um servidor de autorização (Authorization Server).

O protocolo é implementado com fluxos distintos, de acordo com o contexto da API:

- **[APIs Públicas](../glossary#api-pública-ou-api-externa):** Utilizam o fluxo *Client Credentials* com extensões de segurança do [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-2_0-security-02.html), garantindo:
  - Autorização granular com [RBAC](#) e [ABAC](#)
  - Rastreabilidade de operações
  - Proteção contra fraudes
  - Autenticação mútua entre cliente e servidor

- **[APIs Privadas](../glossary#api-privada-ou-api-interna):** Utilizam OAuth 2.0 com **tokens JWT emitidos por um IdP confiável**, assegurando:
  - Comunicação segura entre módulos internos
  - Controle de acesso por funções ([RBAC](#))
  - Isolamento de rede via [Virtual Private Cloud (VPC)](https://en.wikipedia.org/wiki/Virtual_private_cloud)

Essa abordagem unificada permite interoperabilidade entre componentes da plataforma, compatibilidade com regulações (LGPD, PCI DSS) e aderência a padrões como OpenID e FAPI.

## Referências

- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-2_0-security-02.html)
- [RFC 2906: AAA Authorization Requirements](https://datatracker.ietf.org/doc/html/rfc2906)
- [RFC 6749: The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [Wikipedia: Virtual Private Cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud)
