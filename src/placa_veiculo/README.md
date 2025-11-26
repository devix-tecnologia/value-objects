# PlacaVeiculo

Value Object para validação e formatação de placas de veículos brasileiros.

## Características

- Valida placas no formato antigo (ABC1234) e Mercosul (ABC1D23)
- Normaliza automaticamente a entrada (remove espaços, hífens e converte para maiúsculas)
- Fornece métodos para identificar o formato da placa

## Uso

```typescript
import { PlacaVeiculo } from '@devix-tecnologia/value-objects'

// Formato Antigo
const placaAntiga = new PlacaVeiculo('ABC-1234')
console.log(placaAntiga.isValid()) // true
console.log(placaAntiga.format) // 'ANTIGA'
console.log(placaAntiga.formatted) // 'ABC-1234'
console.log(placaAntiga.isOldFormat()) // true

// Formato Mercosul
const placaMercosul = new PlacaVeiculo('ABC1D23')
console.log(placaMercosul.isValid()) // true
console.log(placaMercosul.format) // 'MERCOSUL'
console.log(placaMercosul.formatted) // 'ABC-1D23'
console.log(placaMercosul.isMercosul()) // true

// Validação e comparação
const placa1 = new PlacaVeiculo('abc1234')
const placa2 = new PlacaVeiculo('ABC-1234')
console.log(placa1.equals(placa2)) // true
```

## Formatos Aceitos

### Formato Antigo (ABC1234)
- 3 letras seguidas de 4 números
- Exemplo: `ABC-1234`, `XYZ9876`

### Formato Mercosul (ABC1D23)
- 3 letras + 1 número + 1 letra + 2 números
- Exemplo: `ABC-1D23`, `XYZ9A87`, `ODC-8I63`

## API

### Propriedades

- `formatted`: Retorna a placa formatada com hífen
- `unformatted`: Retorna a placa sem formatação
- `format`: Retorna o tipo de formato ('ANTIGA', 'MERCOSUL' ou 'INVALID')
- `type`: Retorna 'VEHICLE_PLATE'
- `version`: Retorna a versão da implementação
- `validation`: Retorna descrição da validação aplicada

### Métodos

- `isValid(config?)`: Verifica se a placa é válida
- `equals(other)`: Compara com outra placa
- `isMercosul()`: Verifica se está no formato Mercosul
- `isOldFormat()`: Verifica se está no formato antigo
- `toJSON()`: Retorna representação JSON
- `toString()`: Retorna placa formatada

## Validações

- Remove espaços e hífens automaticamente
- Converte para maiúsculas
- Valida formato de acordo com padrão brasileiro
- Rejeita placas muito curtas, muito longas ou com caracteres especiais

## Exemplos de Uso

```typescript
// Entrada flexível
const placa1 = new PlacaVeiculo('abc 1234')
const placa2 = new PlacaVeiculo('ABC-1234')
const placa3 = new PlacaVeiculo('ABC1234')
// Todas são equivalentes

// Verificação de formato
const placa = new PlacaVeiculo('ABC1D23')
if (placa.isMercosul()) {
  console.log('Placa no padrão Mercosul')
}

// Tratamento de erros
try {
  const placaInvalida = new PlacaVeiculo('INVALID')
  placaInvalida.isValid({ raiseException: true })
} catch (error) {
  console.error('Placa inválida!')
}

// Serialização
const placa = new PlacaVeiculo('ABC1234')
console.log(JSON.stringify(placa.toJSON()))
// {"type":"VEHICLE_PLATE","value":"ABC1234","formatted":"ABC-1234","format":"ANTIGA","isValid":true,"version":"1.0.0"}
```
