---
sidebar_position: 3
keywords: [guardia core bancario, libro mayor transaccional, libro mayor como servicio, kernel de libro mayor, activos, activos globales, activos vinculados, ias-1, ias-8]
---

# Visión General de Activos (Assets)

Los Activos en el LKE (Ledger Kernel Engine) representan unidades de valor — monetarias o no monetarias — utilizadas en asientos contables. El sistema implementa una arquitectura de dos niveles que combina flexibilidad operacional con integridad contable.

## Arquitectura de Assets

### Activos Globales (Global Assets)
**Definiciones universales** que establecen estándares para activos que pueden ser utilizados en múltiples contextos contables. Sirven como plantillas que garantizan consistencia y facilitan reconciliaciones entre diferentes sistemas.

- Mantienen identidad común y trazable
- Definen denominaciones estandarizadas
- Clasifican activos por tipo operacional (Fiat vs Non-Fiat)

### Activos Vinculados (Bound Assets)
**Especializaciones contextuales** de Activos Globales dentro de Ledgers específicos. Permiten adaptaciones para necesidades operacionales, regulatorias o técnicas específicas sin comprometer la trazabilidad global.

- Sobrescriben configuraciones específicas cuando es necesario
- Mantienen vínculo con el Activo Global original
- Garantizan inmutabilidad de las relaciones contables

## Flujo de Utilización

```
Activo Global (USD)
       ↓
Activo Vinculado (USD en Ledger A)
       ↓
Book (Cartera del Cliente X)
       ↓
Entries (Transacciones contables)
```

## Documentación Detallada

### [Activos Globales](./global-assets.md)
Especificación completa sobre definiciones universales de activos, incluyendo:
- Clasificación operacional (Fiat vs Non-Fiat)
- Estructura de denominación estandarizada
- Guías prácticas de clasificación
- Ejemplos de configuración

### [Activos Vinculados](./bound-assets.md)
Especificación sobre especialización contextual de activos, abordando:
- Vinculación de assets a Ledgers específicos
- Relaciones con Books y Entries
- Garantías de integridad contable
- Conformidad con normas IAS 1 e IAS 8

## Principios Fundamentales

### Trazabilidad Global
Todo uso de activo mantiene vínculo con su definición global, permitiendo reconciliaciones y auditoría cross-ledger.

### Inmutabilidad Contable
Una vez establecidas las relaciones entre Activos Vinculados, Books y Entries, se preservan para garantizar integridad histórica.

### Especialización Controlada
Permite adaptaciones contextuales necesarias sin comprometer la identidad y consistencia de los activos globales.

### Conformidad Normativa
Alineación con principios contables internacionales, especialmente IAS 1 (representación fiel) e IAS 8 (tratamiento prospectivo).

## Referencias Técnicas

- [Modelo de Dominio](../models/index.md)
- [Books - Instancias de Uso](../books/index.md)
- [Especificaciones de la API](../../api/lke/introducao/)