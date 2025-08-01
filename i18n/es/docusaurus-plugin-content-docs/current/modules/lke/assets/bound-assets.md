---
sidebar_position: 2
keywords: [guardia core bancario, libro mayor transaccional, libro mayor como servicio, activos vinculados, vinculación de activos, contextualización de activos, ias-1, ias-8]
---

# Activos Vinculados (Bound Assets)

Los Activos Vinculados representan la especialización contextual de Activos Globales dentro de Ledgers específicos. Permiten que un mismo activo global sea configurado de forma diferenciada para atender las necesidades operacionales, regulatorias o técnicas de cada contexto contable.

Este enfoque garantiza flexibilidad operacional sin comprometer la trazabilidad global de los activos, posibilitando configuraciones específicas como alteración de exponentes, códigos o metadatos conforme las exigencias de cada Ledger.

## Propósito y Contextualización

### Por Qué los Activos Vinculados Son Necesarios

La vinculación contextual resuelve desafíos operacionales comunes en sistemas multi-ledger:

- **Adaptación regulatoria**: Diferentes jurisdicciones pueden exigir representaciones distintas del mismo activo
- **Precisión operacional**: Sistemas heredados pueden tener limitaciones técnicas específicas (ej: solo valores enteros)
- **Conformidad contable**: Alineado con IAS 1 (par. 15–17), garantiza representación fiel de los fenómenos económicos
- **Auditabilidad**: Mantenimiento de rastros claros entre configuración global y uso contextual

### Especialización de la Denominación

Cuando un Activo Global es vinculado a un Ledger, es posible **sobrescribir selectivamente** elementos de su denominación original:

**Ejemplo Práctico:**
- **Activo Global USD**: `exponent = 2` (estándar: centavos)
- **Activo Vinculado USD en Ledger A**: `exponent = 2` (mantiene configuración global)
- **Activo Vinculado USD en Ledger B**: `exponent = 0` (solo valores enteros por limitación sistémica)

Esta flexibilidad permite que el mismo activo global sea usado en diferentes contextos sin conflictos operacionales.

## Relaciones e Integridad Contable

### Relación Activo Vinculado → Book

La creación de Books (carteras) sigue principios rigurosos de inmutabilidad para garantizar integridad histórica:

#### Reglas Fundamentales

- **Vinculación única**: Un Book es **SIEMPRE** creado con base en un Activo Vinculado específico
- **Herencia en el momento de la creación**: Toda configuración del Activo Vinculado (denominación, exponente, metadatos) es **heredada y fijada** en el momento de la creación del Book
- **Inmutabilidad**: Después de creado, un Book **NO PUEDE** ser reasignado a otro Activo Vinculado

#### Tratamiento de Alteraciones

Cuando hay necesidad de modificar configuraciones de un Activo Vinculado:

1. **Creación de nueva versión**: Debe crearse un nuevo Activo Vinculado con las configuraciones actualizadas
2. **Books futuros**: Nuevos Books deben referenciar el Activo Vinculado actualizado
3. **Books existentes**: Permanecen vinculados a la configuración original, preservando histórico contable

```
Activo Global: USD
│
├── Ledger A: Activo Vinculado (exponent: 2)
│   ├── Book A
│   └── Book B
│
└── Ledger B: Activo Vinculado (exponent: 0) 
    ├── Book C
    └── Book D
```

### Relación Activo Vinculado → Entry (vía Book)

Las Entries (asientos contables) heredan el contexto del Activo Vinculado **indirectamente**, a través del Book:

#### Flujo de Herencia Contextual

1. **Activo Vinculado** define configuración específica del activo en el Ledger
2. **Book** hereda y congela esas configuraciones en el momento de la creación
3. **Entry** utiliza las configuraciones congeladas del Book para sus asientos

#### Garantías de Integridad

- **Representación fiel**: Cada Entry refleja exactamente las configuraciones vigentes cuando el Book fue creado
- **Inmutabilidad histórica**: Alteraciones posteriores en el Activo Vinculado no afectan Entries ya creadas
- **Consistencia contable**: Todos los asientos de un Book mantienen la misma representación del activo

## Conformidad Normativa

### Alineación con IAS 1 (Representación Fiel)

El modelado de Activos Vinculados asegura **representación fiel** de los eventos contables:

- **Precisión contextual**: Cada Ledger puede configurar assets conforme sus necesidades específicas
- **Transparencia**: El origen global del activo permanece trazable
- **Consistencia**: Configuraciones son aplicadas uniformemente dentro de cada contexto

### Alineación con IAS 8 (Tratamiento Prospectivo)

El tratamiento de alteraciones sigue el principio prospectivo:

- **Efecto futuro**: Alteraciones en Activos Vinculados afectan solo operaciones futuras
- **Preservación histórica**: Registros anteriores mantienen su representación original
- **Documentación**: Cada versión de Activo Vinculado mantiene rastro de auditoría

## Cuándo Usar Activos Vinculados

### Escenarios Recomendados

- **Multi-jurisdicción**: Cuando el mismo activo necesita ser representado diferentemente en jurisdicciones distintas
- **Sistemas heterogéneos**: Cuando diferentes Ledgers tienen limitaciones técnicas específicas
- **Conformidad específica**: Cuando regulamentaciones locales exigen configuraciones particulares
- **Evolución controlada**: Cuando configuraciones de assets necesitan evolucionar manteniendo histórico íntegro

### Cuándo Considerar Alternativas

- **Contexto único**: Si el activo será usado solo en un Ledger específico, considere definir directamente como Activo Global
- **Configuración volátil**: Para assets con configuraciones que cambian frecuentemente, evalúe si el overhead de versionado compensa

## Comportamientos Esperados

### Creación de Activo Vinculado

```http
POST /ledgers/{ledger-id}/assets
Content-Type: application/json

{
  "global_asset_id": "usd-global-v1",
  "denomination": {
    "code": "USD",
    "exponent": 0  // Sobrescribe el exponent global (2)
  }
}
```

### Herencia Automática

- **Campos no especificados**: Heredan automáticamente del Activo Global
- **Campos especificados**: Sobrescriben la configuración global
- **Trazabilidad**: Link para el Activo Global es siempre mantenido

### Versionado Transparente

- **IDs únicos**: Cada versión de Activo Vinculado recibe identificador exclusivo
- **Metadata de versionado**: Timestamps y referencias para auditoría
- **Backward compatibility**: Books antiguos continúan funcionando normalmente

## Limitaciones y Restricciones

- **Inmutabilidad de Books**: Una vez activado (esto es, recibió su primer asiento), un Book no puede ser reasignado
- **Propagación unidireccional**: Alteraciones en Activos Globales no se propagan automáticamente para Activos Vinculados
- **Overhead operacional**: Cada alteración requiere creación de nueva versión

## Referencias

- [Activos Globales - Definiciones Universales](./global-assets.md)
- [Modelo de Dominio - Activo Vinculado](../models/index.md#boundasset)
- [Books](../books/index.md)
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-1-presentation-of-financial-statements.pdf?bypass=on)
- [IAS 8: Accounting Policies, Changes in Accounting Estimates and Errors](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors.pdf?bypass=on)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ifrs-9-financial-instruments.pdf?bypass=on)
- [IAS 21: The Effects of Changes in Foreign Exchange Rates](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-21-the-effects-of-changes-in-foreign-exchange-rates.pdf?bypass=on)
- [IAS 32: Financial Instruments: Presentation](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2022/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)